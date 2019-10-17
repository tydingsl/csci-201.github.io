# How to Write a Lexer

Previously, you learned that a lexer (also called a scanner) is a piece of software that reads a program's source code and divides it into meaningful "chunks" called lexemes. Writing a lexer is the first step in implementing a programming language.

It's easy to become confused with so many languages flying around. To clarify, we will call the PL that we are using to do the programming the **implementation language**. We will call the small language that we are implementing the **source language**. (We process its source code.)

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

Here is the set of tokens, along with the JavaScript regular expressions that define them.

<script src="http://gist-it.appspot.com/http://github.com/smattingly/language-implementation/blob/5801d51d8ef5a2db16688a9f9905a6bcd54ef281/scripts/Lexeme.js?footer=no&slice=33:53"></script>

The lexer works by:

1. Defining the JavaScript object shown above to hold a set of regular expressions. The property values in this object (shown in green) are [regular expression literals](https://learning.oreilly.com/library/view/javascript-the-definitive/9781449393854/ch04s01.html), with the pattern enclosed in forward slashes.
2. Testing the input source code against each regular expression, in the order they are defined, until a match is found. (A match will always be found because the last regex matches everything.)
3. Removing the portion of the input code that matched a regular expression from the front of the input code string. (We know the match is at the front because all the regular expressions start with [`^`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#special-caret).) 
4. Storing that matched text for later processing, in an array where each element is a lexeme object containing the source code that was matched and the corresponding token name.
5. Repeating this process from step 2, as long as there is more source code to process.

When the end of the source code is reached, the only processing of the lexeme array is to print its contents. More sophisticated processing will take place later. The lexer has completed its task, converting an input string into a sequence of lexemes.

Note that there are a few details left out of this summary. For example, white space (tabs, spaces, etc.) is not added to the array of lexemes, and the lexer ignores comment symbols and everything in between.

Note also that the order of the regular expressions is important. For example, the keywords must appear before the identifier regex, otherwise they would be matched as identifiers. Also, the regex for unrecognized inputs must appear last; this regex will match literally any input. It ensures that the input will always match one of the regexes; in the last resort, the input is "recognized as being unrecognized".
