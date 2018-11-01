# Abstract Data Types and Programming Paradigms

An **abstract data type** (ADT) is usually defined as a set of possible data values plus a set of operations that work on those data values.

ADTs are the way that you create abstractions in PLs. An **abstraction** is a "big picture viewpoint" that ignores some details. It is seeing the forest instead of the trees. In Chapter 5, McConnell says "if you refer to an object as a 'house' rather than a combination of glass, wood, and nails, you're making an abstraction".

## Structures/Records: ADTs in Procedural Programming

The values of an ADT typically have some complex form beyond a single number or text string. In other words, an ADT value is typically made up of meaningful parts that have names.

You saw an example of this idea in Chapter 13: C and C++ have structures, and Pascal has records, all of which have named fields. Here is Pascal code that defines an ADT representing an animal shelter, consisting of four named fields, each of an appropriate type.

```pascal
type animal_shelter_type = record
   cats : cat_type, 
   bank_balance : dollar_type, 
   open_jobs : job_type, 
   scheduled_reservations : reservation_type;
end;
```

You could now model your local shelter by declaring a variable of the new ADT, and setting the value of some of its fields.

```pascal
var local_shelter : animal_shelter_type;
local_shelter.cats = 3;
```

You would need to write routines to implement the operations on the ADT. Maybe something like this.

```pascal
procedure schedule_new_reservation(var the_shelter : animal_shelter_type)
begin
   the_shelter.scheduled_reservations = the_shelter.scheduled_reservations + 1;
end;
```

This routine is named `schedule_new_reservation`, and expects an argument named `the_shelter` of type `animal_shelter_type`. It increments the value of the `scheduled_reservations` field for the shelter record identified by the argument.

Notice that Pascal resembles JavaScript (and many other PLs besides) by using the dot notation to identify the field/object variable within the record/object.

On the other hand, notice that Pascal differs from JavaScript's use of the dot to indicate which instance of an ADT (which object) that a function call should operate on. Instead, the Pascal routine expects an argument that identifies which instance of the ADT to work on. This approach is one characteristic of **procedural programming**. This describes the idea of organizing the program instructions into procedures (routines) that communicate by passing arguments.

Procedural programming is one of many programming paradigms. A **paradigm** is a mental model, a viewpoint, a way of thinking, a world view, or system of thought. Each PL incorporates one or more programming paradigms to varying extents.

## ADTs in Object-oriented Programming

In addition to procedural programming, JavaScript incorporates many aspects of a paradigm called **object-oriented programming** (OOP). OOP is an extension of the procedural paradigm, which uses objects as another level of organization.

### Class-based OOP Languages

The vast majority of object-oriented languages implement ADTs using something called a class, and so are called *class-based* PLs. Usually these PLs use the dot notation to access methods (routines) as well as data fields. For example, here is the animal shelter ADT implemented as a Java class.

```Java
public class AnimalShelter {
   private CatType cats;
   private DollarType bankBalance;
   private JobType openJobs;
   private ReservationType scheduledReservations;

   public void scheduleNewReservation() {
      this.scheduledReservations = this.scheduledReservations + 1;
   }

   /* Constructor */
   public AnimalShelter() {
      this.cats = 0;
      this.bankBalance = 0;
      this.openJobs = 0;
      this.scheduledReservations = 0;
   }
}
```

Like a record or structure, a class defines the name and data type of the fields that make up the animal shelter ADT. But classes usually go farther than the record/structure: a typical *class* definition includes the routines that define the ADT operations as well as the data fields.

To use the Java class above, you would create an object of the class, then use dot notation to call the routines that are the class's methods.

```java
AnimalShelter localShelter = new AnimalShelter();

localShelter.scheduleNewReservation();
```

The first statement above declares a reference variable named `localShelter`, and makes it refer to a brand new object of the class `AnimalShelter`. The second statement calls a method to schedule a new reservation at the local shelter. Notice that there is no argument passed in the method call, as there was in the earlier procedural examples. How does the routine know which instance of the ADT to work on? It works on the ADT instance that appears in front of the dot in the method call. This use of the dot notation is sometimes described as "message passing"; you send the `scheduleNewReservation` message to `localShelter`. The object that is receiving the message is sometimes called an "implicit argument". Inside the method's code, the object can be accessed through the built-in name `this`. In many OOP languages (Java, JavaScript, C++, ...), `this` (or a similar reserved work) refers to the object that is the "context" for the current routine call.

You can think of a class as a template or mold or cookie cutter that is the basis for creating objects. A class is like a blueprint: by itself it provides only a description. You must **instantiate** it (build an instance of it-- an object) in order to have a house to live in. You can instantiate the same blueprint as often as you like.

### Prototype-based OOP Languages

A few object-oriented languages eliminate the distinction between classes and instances; these are called *prototype-based* languages for reasons that will become clear. JavaScript is the only widely known prototype-based PL. JavaScript is an extremely popular language, in part because every full-featured Web browser runs JavaScript code. (By the way, there is no real connection between JavaScript and Java; the similar names are just a marketing trick.)

If class-based languages create objects by looking at the class definition as a kind of blueprint, how does a prototype-based PL like JavaScript create objects? There are two ways. The first is called *ex nihilo*, which means "from nothing". This is kind of like building a house just as you want it, without any pre-existing blueprint. Here is some JavaScript.

```javascript
let local_shelter = { cats: 0, bank_balance : 0, open_jobs : 0, scheduled_reservations : 0 };
```

This declares a variable `local_shelter` and makes it refer to a new object that consists of four (very familiar) named fields, all of which are set to zero values. You can now use the familiar dot notation.

```javascript
local_shelter.cats = 3;
local_shelter.employees = 9;
```

Wait a minute. Where did this `employees` property come from? That wasn't in the definition when the object was created! So will the assignment produce an error?

No. If you expected that it would, it's probably because the `employees` property was not included in the blueprint. But you need to shift perspective, because there is no blueprint here! With prototype-based OOP languages, you can easily modify the structure as you go, without worrying about conforming to any preexisting blueprint.

The second way that objects are created without classes is by cloning. An existing object (called the *prototype* in this context) is cloned to create a second, new object. Once you have built a house (with or without a blueprint), you can say "use that as the prototype and build another one just like it."

You might think that JavaScript's popularity would make prototype-based OOP famous. But it hasn't, and one expert called JavaScript "the world's most misunderstood programming language". Recent updates to the JavaScript language have introduced alternative syntax that resembles the syntax of class-based OOP languages. So, it is now possible to write JavaScript that resembles Java, C++, and others more than it resembles old-school JavaScript. I call this style **[metatypic](https://en.wikipedia.org/wiki/Metatypy) JavaScript**, and we use it as our core teaching language.

### Bottom line

Different PLs define ADTs in different ways: structures, records, objects, instances, classes, and who knows what. But the most important idea is the underlying fundamental concept: ADT.

## Information Hiding: Interface vs. Implementation

An ADT (whether implemented with a class or something else) has an "outside" and an "inside".

The outside is public information that is shared with anyone. It is the information needed to use the ADT. This outside part is called the ADT's **interface**. For example, the jsdoc documentation file gives you all the information you need to work with the `Queue` ADT: what the function names are, what arguments they need, and a description of what they do. This is the ADT's interface.

The inside is private information that should not be shared. This is often called the ADT's **implementation**. For example, the documentation does not tell you if `Queue` is implemented with an array or a linked list. You don't need to know.

Restricting ADT information on a need-to-know basis is a practice called **information hiding**.

Procedural programming languages rarely have features to enforce information hiding. Instead, it is left up to the discipline of the programmers and the quality of their ADT's design. For example, look back to the Pascal routine `schedule_new_reservation` above. It does its job by incrementing one of the fields in the ADT. Pascal has no feature that would prevent any program using the ADT from modifying that field's value directly. If you were writing documentation for the ADT, you would say to call the `schedule_new_reservation` routine to set up a new reservation, but would not mention the field name at all. That's information hiding, and hopefully no one will write code to do something like setting the `scheduled_reservations` field to -1.

Many class-based OOP languages have features that enforce information hiding. They allow the programmer to set access permissions on the members of the class. For example, look back to the Java class shown above, and notice the keywords `private` and `public` showing up a lot. The `private` keyword prevents a class member (field or method) from being used outside of the class itself. The four data fields in the Java class cannot be accessed by code that is not defined inside the same class. The `public` keyword means that a class member is available to all code.

Assuming that you are writing code outside of the Java class above, the following would produce a compiler error.

```java
localShelter.scheduledReservations = localShelter.scheduledReservations + 1;
```

Even though `scheduledReservations` is a valid data member of the `localShelter` object's class, you cannot access it from outside the class because it is `private`. So how do you get anything done? That's where the public interface comes in. You can do the following (as shown previously).

```java
localShelter.scheduleNewReservation();
```

This works because `scheduleNewReservation()` is a valid method in the object's class, and it is declared `public`. The public methods of a Java class define its interface.

It is tempting to declare all the data fields public so that whatever you want to do will work, and there are no hoops to jump through. It takes more effort to set up a good public interface that hides the internal details of the implementation. But it is worth it for many reasons, especially security and ease of change.

Would you open up all the ports on a network firewall so that anyone could communicate in any way they wanted? Hopefully not, because of the security risks. And you don't declare all your data to be public for the same reason. If any code can directly access the raw data for the number of reservations, someone might set it to a negative number or do other things that should not be allowed. It is much better to declare all data private, and use public methods to allow only the types of operations you define. This is like closing all firewall ports by default, and opening only those to allow the types of traffic that you approve.

As for ease of change, suppose you wanted to modify the program so that each reservation was recorded on a central calendar. If you have hidden implementation details behind a good interface as shown, this is no problem. You simply add the new code to the existing `scheduleNewReservation()` method. But if instead you had allowed anyone to directly increment the count of reservations from any code, you would have no way to easily implement the change.

McConnell uses the term **encapsulation** to describe these PL features that enforce information hiding. (Be warned that some other authors use this term somewhat differently.) In Chapter 5, McConnell writes that encapsulation picks up where abstraction leaves off. He explains that abstraction means you're allowed to look at an instance at a high level of detail. Encapsulation means you're not allowed to look at an instance at any other level of detail. "Continuing the housing-materials analogy: encapsulation is a way of saying that you can look at the outside of the house, but you can't get close enough to make out the door's details. You are allowed to know that there's a door, and ... whether the door is open or closed, but you're not allowed to know whether the door is made of wood, fiberglass, steel, or some other material."
