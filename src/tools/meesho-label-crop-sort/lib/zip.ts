/**
 * A minimal ZIP writer, so "download all" is one file instead of several.
 *
 * Browsers allow a page one automatic download and then ask permission for
 * the rest. Clicking a link per file meant a seller splitting labels into four
 * courier PDFs could silently end up with only the first one. One archive is
 * one download, so there is nothing to permit and nothing to lose.
 *
 * Entries are stored, not deflated. The payloads are PDFs, which are already
 * compressed internally, so deflating them would cost CPU on a cheap phone to
 * save almost nothing. Storing also keeps this to a few dozen lines with no
 * dependency, which matters on a site that ships no server.
 */

/** CRC-32, built once on first use. Required by the ZIP central directory. */
let crcTable: Uint32Array | null = null
function crc32(bytes: Uint8Array): number {
  if (!crcTable) {
    crcTable = new Uint32Array(256)
    for (let i = 0; i < 256; i++) {
      let c = i
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
      crcTable[i] = c >>> 0
    }
  }
  let crc = 0xffffffff
  for (let i = 0; i < bytes.length; i++) {
    crc = crcTable[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8)
  }
  return (crc ^ 0xffffffff) >>> 0
}

/** MS-DOS date and time, which is what the ZIP header format still carries. */
function dosStamp(date: Date): { time: number; date: number } {
  return {
    time:
      (Math.floor(date.getSeconds() / 2) & 0x1f) |
      ((date.getMinutes() & 0x3f) << 5) |
      ((date.getHours() & 0x1f) << 11),
    date:
      (date.getDate() & 0x1f) |
      (((date.getMonth() + 1) & 0x0f) << 5) |
      (((date.getFullYear() - 1980) & 0x7f) << 9),
  }
}

export interface ZipEntry {
  name: string
  bytes: Uint8Array
}

/**
 * Packs entries into an uncompressed archive.
 *
 * Names are written with the UTF-8 flag set, so a shop name outside ASCII
 * survives into the extracted file names.
 */
export function makeZip(entries: ZipEntry[], now: Date): Blob {
  const encoder = new TextEncoder()
  const stamp = dosStamp(now)
  const parts: Uint8Array[] = []
  const central: Uint8Array[] = []
  let offset = 0

  for (const entry of entries) {
    const name = encoder.encode(entry.name)
    const crc = crc32(entry.bytes)
    const size = entry.bytes.length

    const local = new DataView(new ArrayBuffer(30))
    local.setUint32(0, 0x04034b50, true) // local file header
    local.setUint16(4, 20, true) // version needed
    local.setUint16(6, 0x0800, true) // UTF-8 names
    local.setUint16(8, 0, true) // stored
    local.setUint16(10, stamp.time, true)
    local.setUint16(12, stamp.date, true)
    local.setUint32(14, crc, true)
    local.setUint32(18, size, true)
    local.setUint32(22, size, true)
    local.setUint16(26, name.length, true)
    local.setUint16(28, 0, true) // no extra field

    parts.push(new Uint8Array(local.buffer), name, entry.bytes)

    const dir = new DataView(new ArrayBuffer(46))
    dir.setUint32(0, 0x02014b50, true) // central directory header
    dir.setUint16(4, 20, true) // version made by
    dir.setUint16(6, 20, true) // version needed
    dir.setUint16(8, 0x0800, true)
    dir.setUint16(10, 0, true)
    dir.setUint16(12, stamp.time, true)
    dir.setUint16(14, stamp.date, true)
    dir.setUint32(16, crc, true)
    dir.setUint32(20, size, true)
    dir.setUint32(24, size, true)
    dir.setUint16(28, name.length, true)
    dir.setUint16(30, 0, true) // extra
    dir.setUint16(32, 0, true) // comment
    dir.setUint16(34, 0, true) // disk
    dir.setUint16(36, 0, true) // internal attrs
    dir.setUint32(38, 0, true) // external attrs
    dir.setUint32(42, offset, true) // offset of local header

    central.push(new Uint8Array(dir.buffer), name)
    offset += 30 + name.length + size
  }

  const centralSize = central.reduce((sum, part) => sum + part.length, 0)

  const end = new DataView(new ArrayBuffer(22))
  end.setUint32(0, 0x06054b50, true) // end of central directory
  end.setUint16(4, 0, true) // this disk
  end.setUint16(6, 0, true) // disk with the directory
  end.setUint16(8, entries.length, true)
  end.setUint16(10, entries.length, true)
  end.setUint32(12, centralSize, true)
  end.setUint32(16, offset, true)
  end.setUint16(20, 0, true) // no comment

  const blobParts = [...parts, ...central, new Uint8Array(end.buffer)].map(
    (part) => part as unknown as BlobPart,
  )
  return new Blob(blobParts, { type: 'application/zip' })
}
