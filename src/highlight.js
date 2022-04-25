import {styleTags, tags as t} from "@lezer/highlight"

export const dHighlighting = styleTags({
  "module import package mixin": t.moduleKeyword,
  "alias __vector align typeof is in out delete cast new assert typeid __parameter __traits": t.operatorKeyword,
  [ "scope return throw switch case default continue break goto if else while do for foreach "
  + "try catch finally" ]: t.controlKeyword,
  [ "invariant unittest debug version template enum synchronized delegate function struct union "
  + "class interface" ]: t.definitionKeyword,
  [ "TypeCtor static public private protected export deprecated abstract final override auto "
  + "__gshared ref extern lazy nothrow pure" ]: t.modifier,
  "super pragma SpecialKeyword with asm TraitsKeyword": t.keyword,
  this: t.self,
  null: t.null,
  "true false": t.bool,
  "void FundamentalType": t.standard(t.typeName),
  Identifier: t.variableName,
  "DoubleQuotedString AlternateWysiwygString": t.string,
  "WysiwygString TokenString": t.special(t.string),
  DelimitedString: t.docString,
  CharacterLiteral: t.character,
  EscapeSequence: t.escape,
  LineComment: t.lineComment,
  BlockComment: t.blockComment,
  NestingBlockComment: t.docComment,
  IntegerLiteral: t.integer,
  FloatLiteral: t.float,
  UpdateOp: t.updateOperator,
  ArithOp: t.arithmeticOperator,
  LogicOp: t.logicOperator,
  "& | ^ << >>": t.bitwiseOperator,
  CompareOp: t.compareOperator,
  "= :": t.definitionOperator,
  ".. ... =>": t.punctuation,
  "( )": t.paren,
  "[ ]": t.squareBracket,
  "{ }": t.brace,
  "< >": t.angleBracket,
  ".": t.derefOperator,
  ", ;": t.separator
})