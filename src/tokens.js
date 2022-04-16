import {ExternalTokenizer} from "@lezer/lr"
import {NestingBlockComment, DelimitedString, TokenString} from "./parser.terms.js"

const Newline = 10, Space = 32, DEL = 127,
      Quote = 34, Plus = 43, Slash = 47, US = 95,
      Zero = 48, A = 65, a = 97,
      ParenL = 40, ParenR = 41,
      AngleL = 60, AngleR = 62,
      BrackL = 91, BrackR = 93,
      BraceL = 123, BraceR = 125;

function isIdentChar(ch) {
  return ch == US || isDigit(ch) || ch >= A && ch < A+26 || ch >= a && ch < a+26 || ch > 255
}

function isDigit(ch) {
  return ch >= Zero && ch <= Zero+9
}

function canDelim(ch) {
  return ch > Space && ch != DEL
}

function isOpenDelim(ch) {
  return ch == ParenL || ch == AngleL || ch == BrackL || ch == BraceL
}

function isCloseDelim(ch) {
  return ch == ParenR || ch == AngleR || ch == BrackR || ch == BraceR
}

export const nestingComment = new ExternalTokenizer(input => {
  if (input.next != Slash && input.peek(1) != Plus) return
  input.advance(2)

  let nesting = 1
  while (nesting) {
  	if (input.next == Slash && input.peek(1) == Plus) {
  	  nesting++
  	  input.advance()
  	}
  	else if (input.next == Plus && input.peek(1) == Slash) {
  	  nesting--
  	  input.advance()
  	}
  	input.advance()
  }

  return input.acceptToken(NestingBlockComment)
})

export const delimString = new ExternalTokenizer(input => {
  if (input.next != Quote) return
  input.advance()

  if (!canDelim(input.next)) return

  let nesting = false
  let count = 1
  let delim = [input.next]
  input.advance()

  if (isOpenDelim(delim[0])) nesting = true
  else if (isIdentChar(delim) && !isDigit(delim)) {
  	while (isIdentChar(input.next)) {
  	  delim[delim.length] = input.next
  	  input.advance()
  	}
  	if (delim.length > 1 && input.next != Newline) return
  }

  while (count) {
  	if (input.next == delim[0]) {
  	  if (nesting) count++
  	  else if (delim.length > 1 && input.peek(-1) == Newline) {
  	  	for(int i = 1; i < delim.length; i++) {
  	  	  if (delim[i] != input.next) break
  	  	  else if (i == delim.length) count = 0
  	  	  input.advance()
  	  	}
  	  } else count = 0
  	}
    else if (nesting && isCloseDelim(input.next)) count--

    input.advance()
  }
  if (input.next != Quote) return

  input.advance()
  return input.acceptToken(DelimitedString)

})

export const tokString = new ExternalTokenizer(input => {
  if (input.next != BraceL) return
  input.advance()

  let nesting = 1
  while (nesting) {
  	if (input.next == BraceL) nesting++
  	else if (input.next == BraceR) nesting--
  	input.advance()
  }

  return input.acceptToken(TokenString)
})