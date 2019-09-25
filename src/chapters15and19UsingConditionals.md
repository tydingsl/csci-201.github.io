# Chapters 15 and 19: Using Conditionals

Read *Code Complete* Chapter 15, plus sections 19.1 and 19.2.

## 15.1 *if* Statements

Lots of valuable suggestions here. In your programming work, you are expected to follow these guidelines to the greatest extent prudent.

## 15.2. *case* Statements

These are also known as `switch` statements in some PLs.

A fair number of programmers seem to really like these. I think they feel that these save effort vs. equivalent `if`/`else` constructions. Maybe this laziness is why they also tend to use these badly, violating many of the guidelines here.

If you use these, use them well. Consider not using them at all, since they add nothing to the power of  `if`/`else`. (This reminds me of the philosophical debate between [Perl](http://c2.com/cgi/wiki?ThereIsMoreThanOneWayToDoIt) and [Python](http://c2.com/cgi/wiki?PythonPhilosophy) (see item number 11 under this link).)

## 19.1 Boolean Expressions

There is lots of good advice in this section. In your programming work, you are expected to follow these guidelines to the greatest extent prudent.

This is as good a place as any to describe JavaScript's set of comparison operators, which allow the programmer to opt for type coercion or type checking. In JavaScript, the expression `5 == '5'` will evaluate to `true`, but `5 === '5'` will evaluate to `false`.  The double equals operator (and its inverse, `!=`) perform type coercion before comparing, but the triple equals operator (and its inverse, `!==`) do not. 

You should know the comparison operators in your PL, and how they work. Be especially careful with comparisons of objects. There is a difference between equivalence-- two distinct objects with identical data contents-- and identity-- two references to the same object.

### Short-circuit evaluation

No matter which PL you are using, it is critical that you understand whether and when your PL short circuits the evaluation of Boolean expressions. Consider this code.

```javascript
if (points_possible > 0 && points_earned / points_possible >= 0.60) {
   result = "You pass.";
} else {
   result = "You fail.";
}
```

Now imagine that `points_possible` has a value of zero. What happens?

Some PLs will produce an error message (possibly at compile time, possibly at run time) because the code attempts to divide by zero, which is an undefined mathematical operation. This behavior proves that these PLs do not "short circuit" when evaluating the Boolean expression.

Other PLs will run without error, and the result will indicate that the student failed. This behavior proves that these PLs "short circuit" when evaluating the Boolean expression.

To be clear, short circuiting has nothing to do with division by zero. This is just one scenario where a programmer might take advantage of short circuiting behavior.

Short circuiting has to do with how Boolean expressions are evaluated. To understand this, think about the Boolean `AND` operation (written as `&&` in many PLs). This operation combines two Boolean values into a single Boolean result. The Boolean values being combined might be literal values `true` and `false`, but usually they are themselves Boolean expressions (which we can label with letters). So the `if` keyword is followed by a Boolean expression, which might be in the form `A && B`, where `A` and `B` are Boolean expressions.

A PL that does *not* **short circuit** will fully evaluate both Boolean expressions `A` and `B`, then combine the two values according to this familiar truth table.

| A     | B     | A AND B |
| ----- | ----- | ------- |
| False | False | False   |
| False | True  | False   |
| True  | False | False   |
| True  | True  | True    |

A PL that does short circuit uses the shortcut indicated by the following truth table. It fully evaluates `A`. In a case where `A` is false, the PL does not bother to evaluate `B`. It doesn't need to; no matter what `B`'s value is, the overall expression `A AND B` must be false. This is the short circuit. The PL will only bother to evaluate `B` in a case where `A` has evaluated to true.

| A     | B                            | A AND B |
| ----- | ---------------------------- | ------- |
| False | doesn't matter, don't bother | False   |
| True  | False                        | False   |
| True  | True                         | True    |

Look back to the code example above. A PL that does not short circuit will evaluate the expression `points_possible > 0`, which is false in our scenario. It will then evaluate the expression `points_earned / points_possible`, which produces an error for division by zero.

In contrast, a PL that short circuits will evaluate the expression `points_possible > 0`, which is false in our scenario. It will not evaluate the second expression; it doesn't need to because the overall result must be false. As a result, no division by zero is attempted, and the `else` block is executed.

A few PLs have multiple versions of `AND` and `OR` operators, with some that short circuit and some that do not. 
