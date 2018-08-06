# Chapter 11: The Power of Variable Names

Read *Code Complete* Chapter 11.

## 11.1 Good Variable Names

Most of this section is straightforward, but one concept may need some explanation.

A **namespace** is a set of names where no duplication is allowed. Here, we apply the concepts to names within programs, but the namespace concept appears in many computing contexts. For example, file system folders are namespaces because you cannot have duplicate filenames in the same folder. However, you can go to a different folder (namespace) and use the same filename again. Internet domains are namespaces: there can be multiple `jdoe` users at different domains, but only one `jdoe@dewv.net`.

In general, a PL's scoping levels create namespaces for variables. A GML script is a namespace because you cannot have two identically named local variables in the same script. Like most PLs, GML has a global namespace, so it is possible to have a script local variable and a global variable that have the same name. Like other object-oriented languages, GML instances are namespaces; each instance can have its own variable of a particular name.

It's important to understand that variables are not the only names in programs. Depending on the PL, you will also give names to things such as scripts, sprites, objects, classes, functions, data types, and so on. The general term for names within a program is **identifier**.

Since scope is primarily an issue of variable visibility, it does not help as much with creating namespaces for identifiers other than variables. Some PLs have other features for creating namespaces for identifiers other than variables. In C++ and Java, for example, namespaces can be applied to classes so that the same class name can be duplicated as long as they are in different namespaces.

## 11.2 Naming Specific Types of Data

Pretty straightforward, as long as you have gotten a handle on the various fundamental data types. Once again, McConnell is almost assuming static typing, since dynamically typed languages allow a variable to hold different types of data at different times. Of course, you won't do very much of that if you follow the rule that a variable should have one and only one purpose.

## 11.3, 11.4 Naming Conventions

Many PLs are associated with one or more conventional ways of forming the names of identifiers.

For example, GML generally follows a convention called **snake case**, where multi-word variable names are created by replacing spaces with underscores, and using all lower case letters, like this: `example_of_a_snake_case_variable_name`.

Another major category of naming convention is called **camel case**, which is like this: `exampleOfACamelCaseVariableName`. There are other conventions, and variations, too.

If you travel internationally, it is one thing to know the language. It's even better to show that you understand the culture enough to take part at deeper levels. You should be aware of the convention(s) that are associated with your PL, and use one consistently and intelligently. If there is no strong convention for your PL, you can use the guidelines in this chapter to come up with your own.

## 11.5-11.7 More Naming Guidelines

Lots of good guidance here. You should apply it to your programming work to the greatest extent prudent.