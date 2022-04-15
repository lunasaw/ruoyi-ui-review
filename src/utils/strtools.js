export const EMPTY = '';

export function makeString (object) {
  if (object == null) return ''
  return '' + object
}

export function escapeRegExp (str) {
  return makeString (str).replace (/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1')
}

export function defaultToWhiteSpace (characters) {
  if (characters == null) {
    return '\\s'
  } else if (characters.source) {
    return characters.source
  } else {
    return '[' + escapeRegExp (characters) + ']'
  }
}

export function trim (str, characters) {
  let nativeTrim = String.prototype.trim
  str = makeString (str)
  if (!characters && nativeTrim) return nativeTrim.call (str)
  characters = defaultToWhiteSpace (characters)
  return str.replace (new RegExp ('^' + characters + '+|' + characters + '+$', 'g'), '')
}

export function contains (str, searchStr) {
  if (str == null || searchStr == null) {
    return false
  }
  return str.indexOf (searchStr) >= 0
}

export function containsIgnoreCase (str, searchStr) {
  if (str == null || searchStr == null) {
    return false
  }
  return contains (str.toUpperCase (), searchStr.toUpperCase ())
}

export function startsWith (str, starts) {
  str = makeString (str)
  starts = makeString (starts)
  return str.lastIndexOf (starts) === 0
}

export function startsWithIgnoreCase (str, starts) {
  return startsWith (str.toUpperCase (), starts.toUpperCase ())
}

export function endsWith (str, ends) {
  str = makeString (str)
  ends = makeString (ends)
  let position
  if (typeof position == 'undefined') {
    position = str.length - ends.length
  } else {
    position = Math.min (toPositive (position), str.length) - ends.length
  }
  return position >= 0 && str.indexOf (ends, position) === position
}

export function endsWithIgnoreCase (str, ends) {
  return endsWith (str.toUpperCase (), ends.toUpperCase ())
}

export function isEmpty (str) {
  return str == null || str.length === 0
}

export function isNotEmpty (str) {
  return !isEmpty (str)
}

export function isBlank (str) {
  return (/^\s*$/).test (makeString (str))
}

export function isNotBlank (str) {
  return !isBlank (str)
}

export function substringBetween (str, open, close) {
  if (str == null || open == null || close == null) {
    return null
  }
  let start = str.indexOf (open)
  if (start !== -1) {
    let end = str.indexOf (close, start + open.length)
    if (end !== -1) {
      return str.substring (start + open.length, end)
    }
  }
  return null
}

export function substringBefore (str, separator) {
  if (isEmpty (str) || separator == null) {
    return str
  }
  if (separator.length === 0) {
    return ''
  }
  let pos = str.indexOf (separator)
  if (pos === -1) {
    return str
  }
  return str.substring (0, pos)
}

export function substringAfter (str, separator) {
  if (isEmpty (str)) {
    return str
  }
  if (separator == null) {
    return ''
  }
  let pos = str.indexOf (separator)
  if (pos === -1) {
    return ''
  }
  return str.substring (pos + separator.length)
}

export function substringBeforeLast (str, separator) {
  if (isEmpty (str) || isEmpty (separator)) {
    return str
  }
  let pos = str.lastIndexOf (separator)
  if (pos === -1) {
    return str
  }
  return str.substring (0, pos)
}

export function substringAfterLast (str, separator) {
  if (isEmpty (str)) {
    return str
  }
  if (isEmpty (separator)) {
    return ''
  }
  let pos = str.lastIndexOf (separator)
  if (pos === -1 || pos === (str.length - separator.length)) {
    return ''
  }
  return str.substring (pos + separator.length)
}
