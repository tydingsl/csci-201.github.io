# Finishing the Parser

The next step in parsing is to take the sequence of lexemes identified by the lexer, and build a tree that represents the structure of the input program.

## A BNF Grammar

Here is the BNF grammar for our source language. (Recall that "source language" refers to the language being implemented.)

```
<program> ::= start <statement>* end
<statement> ::= <assignment_statement> | <output_statement>
<assignment_statement> ::= <identifier> = <expression>
<output_statement> ::= print ( <expression> )
<expression> ::= <identifier> | <number>
<identifier> ::= /[a-zA-Z]+[a-zA-Z0-9_]*/
<number> ::= /[0-9]+/
```

To summarize, a program consists of the reserved word `start`, followed by a set of zero or more statements, followed by the reserved word `end`. Each statement is either an assignment statement or an output statement. There are grammar rules for both types of statement; the rules refer to terminal symbols (such as `print`), a nonterminal symbol (`<expression>`) and two specific tokens that are defined by regular expressions.

## Parsing the Grammar

The general approach is to use our implementation language to define an abstract data type (ADT) for each of the nonterminal symbols in the grammar of the source language.

For example, [this Web form](https://smattingly.github.io/language-implementation/) defines the classes `Program`, `AssignmentStatement`, and `OutputStatement` (among others); each corresponds to one of the grammar's nonterminal symbols.

There is also a parsing method for each nonterminal-- functions named `Program.parse`, `AssignmentStatement.parse`, etc. Each of these compares the sequence of lexemes (built earlier) with the expectations of the grammar rule. For example, `Program.parse` verifies that the first lexeme has the token `start`. It then uses a loop to repeatedly call the `Statement.parse` method. When all these have completed, `Program.parse` finishes by verifying that the last lexeme has the token `end`.

Each parse routine follows this general pattern for verifying its grammar rule: directly check tokens for the terminal symbols in the rule, and call other class's parse routines to delegate the verification of nonterminal symbols in the rule. As this parsing is carried out, a tree is built to represent the structure of the input program. For example, the single object of class `Program` is the root of the tree; it contains an array of statement objects (class `AssignmentStatement` or class `OutputStatement`). Each statement object stores information about its grammatical components. For example, each object of class `AssignmentStatement` will store the identifier that appears on the left hand side of the statement, and the expression that appears on the right hand side.

When the process completes without error, the parser will display a textual representation of the parse tree. Here, for example, is the parse tree that represents a familiar program with three statements (between `begin` and `end`).

```
<program>
    start
    <assignment_statement>
        a
        =
        <expression>
            <number>
                1
    <assignment_statement>
        b
        =
        <expression>
            <identifier>
                a
    <output_statement>
        print
        (
        <expression>
            <identifier>
                b
        )
    end

```

This tree is arranged something like the file trees in graphical user interfaces: the root node for the program appears first, and its five children are indented on tab stop under it. Their children are indented two tab stops, and so on. Remember that each leaf is a terminal symbol, and each non-leaf is a non-terminal.

If the parsing routines encounter a lexeme that does not fit the grammar rules, then the parsing process will terminate with an error. Generally, it is possible to display a message indicating what was expected (according to the grammar rule) and what was actually found (in the lexemes of the source input). In the simplest possible example, the parser will complain that `start` was expected if the first lexeme is anything other than that reserved word.

------

Note. Textbook presentations of tree data structures are usually very abstract, modelling general trees as nodes (vertices) and edges (links or connections). In specific scenarios like parsing, it is often useful to model tree-like relationships in a different, less abstract way. For example, the form's JavaScript parsing code does not explicitly deal with nodes or edges. Instead, the `Program` object (the tree root) contains an array of statement objects (its children). An assignment statement always has three children: a left-hand-side (`lhs`), an assignment operator, and a right-hand-side (`rhs`). The JavaScript object stores the `lhs` identifier and the `rhs` expression in normal instance variables. There is no need to store the assignment operator, because the object "knows" that it is an assignment.