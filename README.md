Team Members:
Mostafa Ahmed: 20206073
Hanna Ayman: 20206086
Youssef Essmat: 20206096
We are supposed to design and develop a full stack clinic reservation system using Python, Angular, and MySQL.

We will follow Database First approuch since we are all have a good knowledge about how our data will be stored and relations between each 2 or more tables.

We will follow iterative and incremental development models with 3-7 Days for each sprint.

---

Work parallelization:
There are multiple challenges when it comes to working in parallel, some of them are discussed here along with suggested solutions for them:

    * Missed abstraction
    Scenario #1
        1.0 Developer A works on feature f():

            f():
                x()
                y()
                z()
            value_f = f()

    Note
    Although I use a function-like notation to explain what a feature consists of, it is not necessary that this is a feature in the code.
    This is not a good way to work, because if developer B needs the function f(), he has to wait until it's done (this is not our point here).

    1.1 Developer B works on feature g():

        g():
            x()
            u()
            z()
        value_g = g()
    * Both features get merged.

    * Problem
        They have missed an opportunity to create an abstraction abs() (notice the repetition of calls to x() and y() in both features):

        abs(fn):
            x()
            fn()
            z()
        value_f = abs(y)
        value_g = abs(u)

    * Possible solutions
        The pull request author notices the missed abstraction after rebasing his branch after the other feature gets merged. He makes the abstraction and refactors both parts.

        The pull request reviewer has knowledge about both parts, notices the missed abstraction after one feature gets merged and the other one is being reviewed. He notifies the pull request author about the missed abstraction

        Nobody notices before the pull request gets merged. The abstraction gets formed later while refactoring.

    Caution
        Avoid causing the aforementioned missed abstraction problem without the cause scenario. Before developing a feature, look for similar features in the component. If you find yourself copy/pasting anything, consider whether it is time to make an abstraction.
    another problem may be lack of dependency => some functions need to use another function that still under development.

    Pair programming/working on x(). Though I personally believe working in groups on a single feature allows for deep thought, so we may encourage working with pair/group.
