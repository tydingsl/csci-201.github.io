# How to Write a Lexer

Previously, you learned that a lexer (also called a scanner) is a piece of software that reads a program's source code and divides it into meaningful "chunks" called lexemes. Writing a lexer is the first step in implementing a programming language.

It's easy to become confused with so many languages flying around. To clarify, we will call the small language that we are implementing the **source language**. The PL that we are using to do the programming is the **implementation language**. 

There are two basic approaches to writing a lexer.

1. Use regular expressions, if the implementation language supports them.
2. Write custom low-level character handling code.

We will consider an example using each approach. JavasScript is the implementation language for the regular expression approach, and GML is the implementation language for the low-level approach. Both examples use the same source language, an imaginary toy language created for this purpose. Here is a sample program in the source language:

```
start
  a = 1
  b = a
  print(b) /* This prints 1 */
end
```

The full lexics of the language will be defined by the two implementations. 

## Lexing with JavaScript and Regular Expressions

See [this web form](./assets/lexer.html) for the JavaScript lexer that uses regular expressions. You can enter some code into the form and click the button to run the lexer. Try it with the sample program provided, and also with some other inputs that you think might be valid in the language. Notice that the lexer will categorize lexemes no matter what order they are in. In other words, it is recognizing "words" but paying no attention to how they are combined into larger sets.

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

You can see the JavaScript code for the lexer by using you browser's View Source option. Most of the work occurs in the `lex()` function. It works by:

1. Defining a JavaScript object to hold a set of regular expressions. (JavaScript objects contain name, value pairs; here the name is the token and the value is a string containing the regular expression.)
2. Testing the input source code against each regular expression, in the order they are defined, until a match is found.
3. The leading portion of the input code that matched a regular expression is stripped from the front of the input code string. For later processing, it is stored in an array where each element is a lexeme object containing the matched token and the source code that was matched.
4. This process is repeated from step 2, as long as there is more source code to process.

When the end of the source code is reached, the only processing of the lexeme array is to print its contents. More sophisticated processing will take place later. The lexer has completed its task, converting an input string into a sequence of lexemes.

Note that there are a few details left out of this summary. For example, white space (tabs, spaces, etc.) is not added to the array of lexemes, and the lexer ignores comment symbols and everything in between.

Note also that the order of the regular expressions is important. For example, the keywords must appear before the identifier regex, otherwise they would be matched as identifiers. Also, the regex for unrecognized inputs must appear last; this regex will match literally any input. It ensures that the input will always match one of the regexes; in the last resort, the input is "recognized as being unrecognized".

## Lexing with GML and Low-Level Character Handling

You can download [this GML archive](https://sakai.lampschools.org/access/content/group/0f8b4ca2-768b-4e67-bfdb-9ca50d1ebd54/LanguageImplementation.gmz) and import it into GameMaker Studio. When you run the game, you will be prompted to enter source code one line at a time, with an empty line to end the input. (This was a convenient way to avoid building an entire text editor in GML.)

When the input is complete, the GML lexer's output will closely resemble that of the JavaScript version. The internal implementation is somewhat different, however. 

Again, a function (script) named `lex()` manages the job. This script delegates portions of the task to other scripts. One named `extract_next_lexeme()` pulls one character at a time from the front of the input source code, building a potential lexeme character by character until it reaches a stop character. (A **stop character** is any character that separates one lexeme from the next: white space, operators, grouping symbols, etc.) This lexeme is returned to `lex()` for categorization as a specific reserved word, identifier, numeric literal, or other token-- known, or unknown. Helper scripts are called for some of this matching. The lexeme (token and source code) is added to an array for further processing.