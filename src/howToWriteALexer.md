# How to Write a Lexer

Previously, you learned that a lexer (also called a scanner) is a piece of software that reads a program's source code and divides it into meaningful "chunks" called lexemes. Writing a lexer is the first step in implementing a programming language.

It's easy to become confused with so many languages flying around. To clarify, we will the PL that we are using to do the programming the **implementation language**. We will call the small language that we are implementing the **source language**. (We process its source code.)

Our implementation language is JavaScript. Our source language is an imaginary toy language created for this purpose. Here is a sample program in the source language:

```
start
  a = 1
  b = a
  print(b) /* This prints 1 */
end
```

The full lexics of the language will be defined by the JavaScript implementations. 

## Lexing with JavaScript and Regular Expressions

See [this web form](https://smattingly.github.io/language-implementation) for the JavaScript lexer. You can enter some code into the form and click the button to run the lexer. Try it with the sample program provided, and also with some other inputs that you think might be valid in the language. Notice that the lexer will categorize lexemes no matter what order they are in. In other words, it is recognizing "words" but paying no attention to how they are combined into larger sets.

The page should display a list of lexemes from the code that you entered, along with their associated tokens. A **token** is a category of lexemes; for example, each keyword and operator is its own token, all identifiers share the same token, and all numeric literals share the same token. There is also a token for unrecognized inputs that the lexer cannot identify as part of the language's lexics.

Here is the set of tokens, along with the JavaScript regular expressions that define them

```javascript
white_space : "^\\s+", 
start : "^start\\b", 
end : "^end\\b",
print : "^print\\b",
assignment_operator : "^=",
open_paren : "^\\(",
close_paren : "^\\)",
open_comment : "^/\\*",
close_comment : "^\\*/",
identifier : "^[a-zA-Z]+[a-zA-Z0-9_]*", // must be after reserved words
numeric : "^[0-9]+\\b",
unrecognized : "^.+\\W"                 // must be last
```

The lexer works by:

1. Defining a JavaScript object (shown above) to hold a set of regular expressions. 
2. Testing the input source code against each regular expression, in the order they are defined, until a match is found.
3. The leading portion of the input code that matched a regular expression is stripped from the front of the input code string. For later processing, it is stored in an array where each element is a lexeme object containing the matched token and the source code that was matched.
4. This process is repeated from step 2, as long as there is more source code to process.

When the end of the source code is reached, the only processing of the lexeme array is to print its contents. More sophisticated processing will take place later. The lexer has completed its task, converting an input string into a sequence of lexemes.

Note that there are a few details left out of this summary. For example, white space (tabs, spaces, etc.) is not added to the array of lexemes, and the lexer ignores comment symbols and everything in between.

Note also that the order of the regular expressions is important. For example, the keywords must appear before the identifier regex, otherwise they would be matched as identifiers. Also, the regex for unrecognized inputs must appear last; this regex will match literally any input. It ensures that the input will always match one of the regexes; in the last resort, the input is "recognized as being unrecognized".
