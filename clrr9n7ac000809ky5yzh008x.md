---
title: "Threads in Java"
seoTitle: "Java Thread"
datePublished: Wed Jan 24 2024 04:09:14 GMT+0000 (Coordinated Universal Time)
cuid: clrr9n7ac000809ky5yzh008x
slug: threads-in-java
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1706069690280/7809eaa3-4c7a-4df4-a121-3d2ba5bed430.png
tags: java

---

### **What are Threads in Java? 🧵 (Simple Explanation)**

Imagine you're in a kitchen 🍳 cooking a meal. You're the chef (the main program), and you have several tasks like chopping vegetables 🥕, boiling water 💧, and frying eggs 🍳. In a normal scenario (single-threaded), you'd do each task one after the other. But what if you could have helpers (threads) who could do some of these tasks at the same time? That's exactly what threads in Java do!

In Java, a thread is like a helper 👥 in your program. It can run parts of your code in parallel with other parts. This means you can do multiple things at the same time, like playing music 🎵 while downloading a file 💾.

### **How to Create Threads 🚀**

There are mainly two ways to create a thread in Java:

1. **By extending the** `Thread` **class**:
    
    * It's like writing a recipe 📝 for your helper.
        
    * You write a class that extends `Thread` and put the instructions in the `run()` method.
        
2. **By implementing the** `Runnable` **interface**:
    
    * This is like giving a list of tasks 📋 to an existing helper.
        
    * You write a class that implements `Runnable` and put the tasks in the `run()` method. Then you give this list to a `Thread` object.
        

### **A Simple Example 🌟**

Let's say you're writing a program that sends an email ✉️ and at the same time calculates the sum of numbers 🔢.

#### Implementing `Runnable` Interface

```java
javaCopy code// Task 1: Sending an Email
class EmailSender implements Runnable {
    public void run() {
        // Code to send an email
        System.out.println("Email sent! 📧");
    }
}

// Task 2: Calculate Sum
class SumCalculator implements Runnable {
    public void run() {
        int sum = 0;
        for (int i = 1; i <= 10; i++) {
            sum += i;
        }
        System.out.println("Sum is: " + sum + " 🧮");
    }
}

public class Main {
    public static void main(String[] args) {
        // Create tasks
        EmailSender emailSender = new EmailSender();
        SumCalculator sumCalculator = new SumCalculator();

        // Create threads
        Thread thread1 = new Thread(emailSender);
        Thread thread2 = new Thread(sumCalculator);

        // Start threads
        thread1.start();
        thread2.start();
    }
}
```

In this example, `EmailSender` and `SumCalculator` are like two separate helpers 👥👥. The `Main` class creates these helpers and starts them. They run simultaneously, so the email can be sent 🚀 while the sum is being calculated 🧠.

### **Benefits of Using Threads 🎉**

* **Efficiency**: Your program can do multiple things at once, like a chef who can cook and talk on the phone simultaneously 📞.
    
* **Better Use of Resources**: If you have to wait for something (like waiting for a file to download), you can do other tasks in the meantime ⏳.
    

### **Things to Keep in Mind ⚠️**

* **Thread Safety**: When threads share resources (like ingredients in a kitchen), you need to be careful. If not handled properly, it can lead to problems (like two helpers using the same frying pan at the same time) 🍳.
    
* **Complexity**: Using threads can make your program more complex, like managing a kitchen with many helpers. You need to coordinate them well 🤹.