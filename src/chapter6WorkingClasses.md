# Chapter 6: Working Classes

Read *Code Complete* Chapter 6.

## 6.1 Abstract Data Types

McConnell starts the chapter strong by pointing out that classes are just one way that PLs define ADTs, and it is the ADTs that are important. Arguably, he forgets about this as he goes along, because he seems to shift to writing about classes exclusively. Throughout this chapter, keep in mind that it is the ADT concept that is fundamental, whether your PL uses classes or something else to define them.

## 6.2 Good Class Interfaces

In general, this section has good guidance that you should apply to your programming to the greatest extend prudent.

Take a look at the last paragraph on page 137. It urges you to find ways of allowing the compiler to check as many aspects of your ADT as possible, minimizing dependence on documentation and programmer self-discipline. This is largely what I mean when I urge students to "Say it in code".

In C++ (and no other PL that I know about), two classes can be declared as **friends**. This means that the usual private access restrictions do not apply; they share everything. This led to the slightly racy joke: "C++, where only friends can access your private parts".

Don't struggle with the guidance that begins at the bottom of page 139 and involves two code examples on the following page. McConnell is probably making too big of a deal about the "problem" here, and the solution may be difficult for you to understand at this point.

## 6.3 Design and Implementation Issues

The more common term for McConnell's "containment" is **composition**. You applied composition in the "Working with Data" course when you implemented a `Stack` ADT that has a `List` hidden inside.

This was more appropriate than inheritance (creating a parent-child relationship), because as McConnell says, inheritance is intended to model "is a" relationships. It would not be correct to say that a stack is a list, so composition was preferred to inheritance. Also, a stack is more restricted than a list, so a `Stack` ADT that inherited from a `List` ADT would have to disable some  operations with overrides that do nothing. (Overriding is discussed further in a moment.)

Unless you have experience with class-based PLs like Java or C++, you probably will not grasp McConnell's references to public inheritance vs. private inheritance and the guidance of Table 6-1. Don't worry about it, but file this away for a day that it might be useful: different PLs have different ways of allowing you to control what gets inherited.

Hopefully it is clear that a child ADT will differ from its parent ADT in some ways. (Otherwise, why have two identical ADTs?) There are two basic forms of difference, and a child ADT might display either or both. First, a child might add some data or operations that are not present in the parent. Second, the child might change the behavior of parent operations. This second form is called **overriding**. In general, a child will inherit its parent's methods (routines), but if the child defines a method with the same name, the child's method takes precedence, or overrides, the parent's version. 

**Polymorphism** (page 147) comes from Greek roots that mean "having many forms". Where there is inheritance, an object may have many forms (many classes or data types) because it is an instance of its child ADT, and it also is an instance of its parent ADT (and also of the parent's parent and all the way up the chain). Now suppose I hand you an instance of a parent ADT, and ask you to perform some operation on it. You might just carry out the instructions for that operation defined for the ADT. But if you are a bit smarter, you will look to see if this thing is also an instance of some child ADT, and if that child ADT overrides the operation. If so, it is the child's version that you should apply. In general, OOP languages will do this for you, as long as you play by their rules and define everything correctly.

Java, C++, and possibly others have an access level called **protected**. This falls between public and private: it allows access only within the class and its descendants (children, grandchildren, great-grandchildren ...).

Some PLs allow **multiple inheritance**, which means the child can inherit from more than one parent. This is very useful for modeling the real world, but it is very complex to create a PL that behaves in this way. It also leads to some tricky situations, like: what happens if the child inherits the same operation from more than one parent? Which definition(s) of the operation should be used? C++ is the best-known PL that supports multiple inheritance; most OOP languages allow only single inheritance. Java and some other PLs support "full inheritance" from one parent, plus a more limited form of reuse from any number of other ADTs.

Many object-oriented PLs have constructors (page 151). A **constructor** is a special method that is automatically executed when a new object is created. The recent example of a Java animal shelter class included a constructor. Java uses a common rule that a method with the same name as the class is recognized as a constructor. Some PLs also have **destructors**, which are automatically called when the programmer destroys an object. This gives the programmer a chance to do any "clean up" needed, such as freeing the memory for other things that the object controls. Garbage-collecting PLs do not have destructors, because the programmer does not control when the object is actually destroyed.