# Interpretation is Simulation, Compilation is Translation

## Review

Remember that we call the small language that you are implementing the "source language". The PL that you are using to do the programming is the "implementation language". 

Previously, you saw that a parser (written in the implementation language) generates a parse tree for an input program in the source language. The parse tree is the basis for further processing of the source language program.

## Interpreting the Source Language Program

Interpretation involves examining the parse tree and, for each source language statement, executing implementation language statements that have the same effect. 

In practice, this typically means adding an "interpret" operation to each ADT that represents a statement or expression in your grammar. A symbol table is used to keep track of source language variables and their current values.

The ADT at the root of the parse tree executes the interpret operation on each of its statements, in order. This should produce the same effect as the source language program.

## Compiling the Source Language Program

Compilation involves examining the parse tree and translating each source language statement into statements in a "target language". The target language is often (but not always) a lower level language.

In practice, this typically means adding a "compile" operation to each ADT that represents a statement or expression in your grammar. When the target language is assembly or machine code, a symbol table can be used to keep track of source language variables and their corresponding memory addresses.

The ADT at the root of the parse tree executes the compile operation on each of its statements, in order. This should produce a translation of the source language program into the target language. Running the target language output should produce the same effect as the source language program.