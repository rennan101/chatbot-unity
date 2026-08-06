

# Documento: en/Manual/test-framework/test-framework-introduction.html

* [Programming in Unity](../scripting.html "../scripting.html")
* Testing your code

Using TransformHandle with Burst

Get started with Unity Test Framework

# Testing your code

Write tests for your Edit mode or Play mode code and run them through the Unity Editor’s **Test Runner** window, from the command line, or from code. Unity Test Framework integrates a custom version of [NUnit](http://www.nunit.org/ "http://www.nunit.org/"), the open-source unit testing library for .NET languages and extends it with Unity-specific capabilities.

As an alternative to [NUnit tests](https://docs.nunit.org/articles/nunit/writing-tests/attributes/test.html "https://docs.nunit.org/articles/nunit/writing-tests/attributes/test.html"), Unity Test Framework provides [Unity tests](https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.UnityTestAttribute.html "https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.UnityTestAttribute.html"), which can interact with Unity-specific concepts such as frames, the application loop, and [domain reload](../domain-reloading.html "../domain-reloading.html"). A Unity test runs as a [coroutine](../Coroutines.html "../Coroutines.html") in Play mode and in the [`EditorApplication.update`](https://docs.unity3d.com/ScriptReference/EditorApplication-update.html "https://docs.unity3d.com/ScriptReference/EditorApplication-update.html") callback loop in Edit mode.

Unity tests can [yield instructions for the Unity Editor](reference-custom-yield-instructions.html "reference-custom-yield-instructions.html"). Once the instruction is complete, the test run continues. You can also `yield return null` in a Unity test to skip a frame and defer an operation until the next iteration of either the `EditorApplication.update` or the [per-frame game update](../time-per-frame-updates.html "../time-per-frame-updates.html") loop.

This documentation assumes you’re familiar with NUnit and with fundamental principles of unit testing in C#. If you’re not, refer to [Unit testing C# with NUnit and .NET Core](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-nunit "https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-nunit") and [Unit testing best practices](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices "https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices") in the Microsoft documentation.

**Note**: Unity Test Framework is a [core Unity package](../pack-core "../pack-core") and is distributed as part of a Unity Editor installation. Unity Test Framework currently uses a custom version of NUnit based on version 3.5.

| **Topic** | **Description** |
| --- | --- |
| **[Get started with Unity Test Framework](getting-started.html "getting-started.html")** | Create your first test assembly and sample Unity Test Framework tests. |
| **[Command-line reference](reference-command-line.html "reference-command-line.html")** | Run tests and configure test settings from the Unity Editor command line. |
| **[Writing tests](writing-tests.html "writing-tests.html")** | Write Unity tests for Edit mode or Play mode code with the Unity Test Framework C# APIs. |
| **[Running tests](running-tests.html "running-tests.html")** | Run Unity tests from the Editor’s **Test Runner** window, from the command line, or directly from code. |
| **[Unity Test Framework learning materials](course/overview.html "course/overview.html")** | Follow a practical tutorial with a series of exercises to help you learn the fundamentals of Unity Test Framework. |

## Additional resources

* [QA your code: The new Unity Test Framework (Unite Copenhagen)](https://www.youtube.com/watch?v=wTiF2D0_vKA "https://www.youtube.com/watch?v=wTiF2D0_vKA")
* [Performance Testing Package for Unity Test Framework](https://docs.unity3d.com/Packages/com.unity.test-framework.performance@latest/ "https://docs.unity3d.com/Packages/com.unity.test-framework.performance@latest/")

Using TransformHandle with Burst

Get started with Unity Test Framework

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/reference-custom-yield-instructions.html

* [Programming in Unity](../scripting.html "../scripting.html")
* [Testing your code](../test-framework/test-framework-introduction.html "../test-framework/test-framework-introduction.html")
* [Writing tests](../test-framework/writing-tests.html "../test-framework/writing-tests.html")
* Yield instructions for the Editor

Asserting and comparing

Parameterized tests

# Yield instructions for the Editor

One of the key additions a `[UnityTest]` provides over regular NUnit `[Test]` is the ability to yield instructions for the Unity Editor. From Unity tests you can skip frames and instruct the Editor to enter or exit Play mode, recompile scripts, or wait for a scheduled [domain reload](../domain-reloading.html "../domain-reloading.html") to finish.

The following commonly-used yield instructions are pre-defined:

* [EnterPlayMode](https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.EnterPlayMode.html "https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.EnterPlayMode.html")
* [ExitPlayMode](https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.ExitPlayMode.html "https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.ExitPlayMode.html")
* [RecompileScripts](https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.RecompileScripts.html "https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.RecompileScripts.html")
* [WaitForDomainReload](https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.WaitForDomainReload.html "https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.WaitForDomainReload.html")

You can also define additional custom yield instructions for the Unity Editor for use in your Edit mode tests. For more information on how to do this, including usage examples, refer to the [`IEditModeTestYieldInstruction`](https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.IEditModeTestYieldInstruction.html "https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.IEditModeTestYieldInstruction.html") interface API description.

For more information on using the `yield` statement in C#, refer to [yield statement](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/yield "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/yield").

For information on the use of `yield`-returned instructions for the Editor in Unity coroutines, refer to [Splitting tasks across frames](../Coroutines.html "../Coroutines.html").

## Yield a MonoBehaviour to test

[`MonoBehaviourTest`](https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.MonoBehaviourTest-1.html "https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.MonoBehaviourTest-1.html") is a [coroutine](https://docs.unity3d.com/ScriptReference/Coroutine.html "https://docs.unity3d.com/ScriptReference/Coroutine.html") and a helper for writing [MonoBehaviour](https://docs.unity3d.com/ScriptReference/MonoBehaviour.html "https://docs.unity3d.com/ScriptReference/MonoBehaviour.html") tests.

Yield return a `MonoBehaviourTest` from a Unity test to instantiate the `MonoBehaviour` you want to test and wait for it to finish running. Implement the `IMonoBehaviourTest` interface on the `MonoBehaviour` to define when the test completes. The following example demonstrates this:

```
[UnityTest]
public IEnumerator MonoBehaviourTest_Works()
{
    yield return new MonoBehaviourTest<MyMonoBehaviourTest>();
}

public class MyMonoBehaviourTest : MonoBehaviour, IMonoBehaviourTest
{
    private int frameCount;
    public bool IsTestFinished
    {
        get { return frameCount > 10; }
    }

     void Update()
     {
        frameCount++;
     }
}
```

## Additional resources

* [Edit mode and Play mode tests](edit-mode-vs-play-mode-tests.html "edit-mode-vs-play-mode-tests.html")
* [Coroutine](https://docs.unity3d.com/ScriptReference/Coroutine.html "https://docs.unity3d.com/ScriptReference/Coroutine.html")
* [YieldInstruction](https://docs.unity3d.com/ScriptReference/YieldInstruction.html "https://docs.unity3d.com/ScriptReference/YieldInstruction.html")

Asserting and comparing

Parameterized tests

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/running-tests-programmatically.html

* [Programming in Unity](../../scripting.html "../../scripting.html")
* [Testing your code](../../test-framework/test-framework-introduction.html "../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../test-framework/course/overview.html "../../test-framework/course/overview.html")
* [General introduction to Unity Test Framework](../../test-framework/course/test-framework-general-introduction.html "../../test-framework/course/test-framework-general-introduction.html")
* 17. Running tests programmatically

16. Custom attributes

Testing Lost Crypt

# 17. Running tests programmatically

## Learning objectives

This section will introduce the TestRunnerApi, teaching you how to trigger a test run programmatically.

## Intro and motivation

A recent new feature in the test framework is the addition of the `TestRunnerApi`. This api allows for interactions with the test framework programmatically, such as listing tests, running tests and receiving test results.

For details and examples, see the TestRunnerApi documentation.

## Exercise

The [sample](test-framework-general-introduction.html#import-samples "test-framework-general-introduction.html#import-samples") `17_RunningTestsProgrammatically` contains a mono behavior script called `MyMonoBehaviour`, which has a property for whether it has been configured. The project also contains a scene with multiple game objects with `MyMonoBehaviour` on them.

The task is to create a set of scene validation tests, which verifies that the scene MyScene.unity:

* The scene contains precisely 5 game objects with `MyMonoBehaviour` on them.
* All game objects with `MyMonoBehaviour` must have `IsConfigured` set to true

After these tests have been created, implement a MenuItem, which can trigger the test run of the scene validation tests, using the `TestRunnerApi` and report the result to the console log.

It is recommended to give your scene validation test a category, so it is easier to make a filter that runs those exclusively.

## Hints

* Remember to include the test mode in the filter provided to `Execute`

## Solution

A full example solution for the excersise is available in the sample `17_RunningTestsProgrammatically_Solution`.

16. Custom attributes

Testing Lost Crypt

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/running-test.html

* [Programming in Unity](../../scripting.html "../../scripting.html")
* [Testing your code](../../test-framework/test-framework-introduction.html "../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../test-framework/course/overview.html "../../test-framework/course/overview.html")
* [General introduction to Unity Test Framework](../../test-framework/course/test-framework-general-introduction.html "../../test-framework/course/test-framework-general-introduction.html")
* 1. Running a test in a Unity project

General introduction to Unity Test Framework

2. Arrange, Act, Assert

# 1. Running a test in a Unity project

## Learning objectives

This exercise will teach you how to set up a simple Unity project with a test assembly and tests. It will also introduce the structure of unit tests based on NUnit.

## Intro and motivation

At Unity, our main way of testing content is using the Unity Test Framework, which comes as a default package in the Unity Editor. Knowing how to set up a basic project with tests can help you get started on your journey.

## Exercise

Import the [sample](test-framework-general-introduction.html#import-samples "test-framework-general-introduction.html#import-samples") `1_RunningTest_Project` into your Unity Editor (version 2019.2 or newer) from the Package Manager window.

**Note:** The project contains one `.cs` file (`MyMath.cs`), which is a simple math implementation. The exercise is to create unit tests for this class.

Open up the Test Runner UI (**Window > General > TestRunner**) and set up a new EditMode test assembly alongside the MyExercise folder. Detailed instructions are available in the [Getting started section](../workflow-create-test-assembly.html "../workflow-create-test-assembly.html"). Create a new test inside the new test assembly folder (default name is `Tests`) either from the Test Runner UI or by right-clicking in the Project window and selecting **Create > Testing > C# test script**. Before we do the test, it is also necessary to link up our test assembly with the existing code assembly. Click on the test assembly you created in the Project window to see it in the **Inspector** (Click on the Tests folder > Tests).

In the Assembly Definition References, you will see that `UnityEngine.TestRunner` and `UnityEditor.TestRunner` are already referenced, along with an assembly reference to NUnit. Click the `+` button in the Assembly Definition Reference part to add a new reference. Click on the little circle and select `MyExercise` and click **Apply** in the bottom of the inspector (you might need to scroll down).

Open up the C# solution with your IDE (Visual Studio or Rider) and open up the test file you created. You can delete the method with the `[UnityTest]` attribute, as you won’t be needing that. In the method with `[Test]` attribute, you can add an assert statement, to verify that `MyMath.Add` works correctly. E.g. using `Assert.AreEqual`. Rename the method to be something more descriptive. A good practice is that the method name should describe what is being tested. For example, the class name could be `MyMathTests` and the first test could then be `AddsTwoPositiveIntegers`. If you want to, you can add additional methods that test other number combinations. It is a best practice that each test should have just one check.

Switch back to Unity and go to the Test Runner UI. Here you should now see a tree structure which includes your test assembly name, the class name and method name. This reflects the general structure of tests with NUnit, which is the framework that Unity Test Framework is built on top of. Each class can have multiple tests and there can be multiple test classes in a namespace / assembly. You can double click on your test name or any of its parents to run the test. You will see a green checkmark if your test code passes and a red cross if your test code failed. Note that if you do not see any tests, remember to check your console log. Any compile error would block all tests from being shown.

You can now go back to your test code and add tests for the `Subtract` method. Note that you will likely see the tests fail, as there is a bug in our `Subtract` method. After you have seen your test fail with a meaningful error (e.g. `Expected 2, but got 6`), you can go to `MyMath.cs` and fix the return value to be just `return a - b;`. Then rerun the test to verify that you fixed the error.

## Hints

* Sometimes the UI for creating a test assembly and creating your first test file can be a bit hard to use. If the Test Runner UI does not register your assembly, try clicking on the folder in the project window or navigate to the folder with the asmdef.

## Solution

A solution for this exercise can be found in the sample `1_RunningTest_Project_Solution`. The solution contains a `Tests` folder with an `asmdef` file and and one `.cs` file, containing the tests.

## Additional resources

* [Organizing scripts into assemblies](../../assembly-definition-files.html "../../assembly-definition-files.html")

General introduction to Unity Test Framework

2. Arrange, Act, Assert

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/setup-teardown.html

* [Programming in Unity](../../scripting.html "../../scripting.html")
* [Testing your code](../../test-framework/test-framework-introduction.html "../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../test-framework/course/overview.html "../../test-framework/course/overview.html")
* [General introduction to Unity Test Framework](../../test-framework/course/test-framework-general-introduction.html "../../test-framework/course/test-framework-general-introduction.html")
* 6. SetUp and TearDown

5. Asserting and expecting logs

7. PlayMode tests

# 6. SetUp and TearDown

## Learning objectives

In this exercise, you will get practical experience in using the NUnit attributes `[SetUp]` and `[TearDown]` in order to reduce code duplication in your tests.

## Intro and motivation

It’s good practice to always let your test code clean up after itself and you also often need to set things up before running a test. If you have multiple tests, then that can easily become a lot of code duplication and if your test fails, your cleanup might not even be run, if you have not wrapped it in `try` and `finally` blocks.

As a solution to this, NUnit has the `[SetUp]` and `[TearDown]` attributes. Methods with this attribute will be run before and after any of the classes respectively. If you are running multiple tests in your class at once, then the teardown and setup are run in between each of the tests.

```
public class TestClass
{
 [SetUp]
 public void MySetUp() { ... }

 [Test]
 public void MyFirstTest() { ... }

 [Test]
 public void MySecondTest() { ... }

 [TearDown]
 public void MyTearDown() { ... }
}
```

## Exercise

Import the [sample](test-framework-general-introduction.html#import-samples "test-framework-general-introduction.html#import-samples") `6_SetUpTearDown`.

In this project there is a class called `FileCreator`. It has two methods:

* `CreateEmptyFile(fileName)` - Creates an empty file in an `OutputFiles` directory
* `CreateFile(string fileName, string content)` - Creates a file with the given content in an `OutputFiles` directory

The catch is that it will throw a `DirectoryNotFoundException`, if there is no output called `OutputFiles` in the current directory. You will need to create this directory inside a `SetUp` method and remove it again afterwards with a `TearDown`. Your test can then assume that it starts with an emtpy directory, which simplifies the assertion.

## Hints

* You can use `Directory.CreateDirectory` to create a directory.
* You can use `Directory.Delete` with the recursive flag (second argument) set to delete the directory along with all its files.
* `Directory.GetFiles` can be used to get files in a given directory.
* `Path.Combine` is a handy method for combining parts of a file path. For example the directory name and the file name.

## Solution

The exercise can be solved with a test like the following:

```
[SetUp]
public void Setup()
{
 Directory.CreateDirectory(FileCreator.k_Directory);
}

[Test]
public void CreatesEmptyFile()
{
 var fileCreatorUnderTest = new FileCreator();
 var expectedFileName = "MyEmptyFile.txt";
 
 fileCreatorUnderTest.CreateEmptyFile(expectedFileName);

 var files = Directory.GetFiles(FileCreator.k_Directory);
 Assert.That(files.Length, Is.EqualTo(1), "Expected one file.");
 var expectedFilePath = Path.Combine(FileCreator.k_Directory, expectedFileName);
 Assert.That(files[0], Is.EqualTo(expectedFilePath));
}

[Test]
public void CreatesFile()
{
 var fileCreatorUnderTest = new FileCreator();
 var expectedFileName = "MyFile.txt";
 var expectedContent = "TheFileContent";
 
 fileCreatorUnderTest.CreateFile(expectedFileName, expectedContent);

 var files = Directory.GetFiles(FileCreator.k_Directory);
 Assert.That(files.Length, Is.EqualTo(1), "Expected one file.");
 var expectedFilePath = Path.Combine(FileCreator.k_Directory, expectedFileName);
 Assert.That(files[0], Is.EqualTo(expectedFilePath));
 var content = File.ReadAllText(expectedFilePath);
 Assert.That(content, Is.EqualTo(expectedContent));
}

[TearDown]
public void Teardown()
{
 Directory.Delete(FileCreator.k_Directory, true);
}
```

A full project with the solution can be found in the sample `6_SetUpTearDown.`

## Additional resources

* [SetUp and TearDown](https://docs.nunit.org/articles/nunit/technical-notes/usage/SetUp-and-TearDown.html "https://docs.nunit.org/articles/nunit/technical-notes/usage/SetUp-and-TearDown.html")

5. Asserting and expecting logs

7. PlayMode tests

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/scene-based-tests.html

* [Programming in Unity](../../scripting.html "../../scripting.html")
* [Testing your code](../../test-framework/test-framework-introduction.html "../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../test-framework/course/overview.html "../../test-framework/course/overview.html")
* [General introduction to Unity Test Framework](../../test-framework/course/test-framework-general-introduction.html "../../test-framework/course/test-framework-general-introduction.html")
* 11. Scene-based tests

10. Long running tests

12. Setup and cleanup at build time

# 11. Scene-based tests

## Learning objectives

In this exercise, you will learn how to test content that is stored in a scene.

## Intro and motivation

A useful scenario for our customers is using the test framework for verifying the content of a scene. That could be checking for certain GameObjects and MonoBehaviors.

The [EditorSceneManager](../../../ScriptReference/SceneManagement.EditorSceneManager.html "../../../ScriptReference/SceneManagement.EditorSceneManager.html") allows for loading and saving scenes. In combination with the test framework, this allows for the implementation of tests that verify a scene.

When changing the state of the Editor in a test, such as loading a scene, it’s good practice to clean up afterward. This can be done in a method with the `[TearDown]` attribute.

## Exercise

Import the [sample](test-framework-general-introduction.html#import-samples "test-framework-general-introduction.html#import-samples") `11_SceneBasedTests`, which contains a scene named `MyGameScene` and an assembly for Edit Mode tests.

The task is to create a test that opens the scene, verifies that the scene contains a game object named `GameObjectToTestFor`.

As cleanup, it should open a new empty scene, which is the default for Edit Mode tests. It is recommended to put that in a `[TearDown]`, which ensures that the cleanup code is run, even if the test fails.

## Hints

* `EditorSceneManager.OpenScene("Assets\\MyGameScene.unity");` loads the scene
* `EditorSceneManager.NewScene(NewSceneSetup.DefaultGameObjects, NewSceneMode.Single);` cleans up by changing back to an empty scene.

## Solution

A full solution is available in the sample `11_SceneBasedTests_Solution`.

The test implementation can look like this:

```
public class SceneTests
{
 [SetUp]
 public void Setup()
 {
  EditorSceneManager.OpenScene("Assets\\MyGameScene.unity");
 }
 
 [Test]
 public void VerifyScene()
 {
  var gameObject = GameObject.Find("GameObjectToTestFor");
  
  Assert.That(gameObject, Is.Not.Null);
 }

 [TearDown]
 public void Teardown()
 {
  EditorSceneManager.NewScene(NewSceneSetup.DefaultGameObjects, NewSceneMode.Single);
 }
}
```

## Additional resources

[API reference for `EditorSceneManager`](../../../ScriptReference/SceneManagement.EditorSceneManager.html "../../../ScriptReference/SceneManagement.EditorSceneManager.html")

10. Long running tests

12. Setup and cleanup at build time

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/long-running-tests.html

* [Programming in Unity](../../scripting.html "../../scripting.html")
* [Testing your code](../../test-framework/test-framework-introduction.html "../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../test-framework/course/overview.html "../../test-framework/course/overview.html")
* [General introduction to Unity Test Framework](../../test-framework/course/test-framework-general-introduction.html "../../test-framework/course/test-framework-general-introduction.html")
* 10. Long running tests

9. Using the UnityTest Attribute

11. Scene-based tests

# 10. Long running tests

## Learning objectives

This exercise will cover best practices and pitfalls for tests that have a long runtime, such as tests yielding back a `WaitForSeconds`.

## Intro and motivation

In Play Mode it is possible for UnityTests to return [Yield instructions](https://docs.unity3d.com/ScriptReference/YieldInstruction.html "https://docs.unity3d.com/ScriptReference/YieldInstruction.html"), such as `WaitForSeconds`. This is supported because in some test cases it can be valid to wait for a limited time. However, long-running tests are in general a bad practice that should be avoided when possible. If you can’t avoid a long-running test, it’s recommended to provide the test with `[Category]` and `[Explicit]` attributes. The `[Category]` attribute is used to label tests with a category name that can later be used as a filter to run a subset of tests selectively. The `[Explicit]` attribute ensures that the test is not run by default when running all tests. The test is only run when it is explicitly selected in the UI, or when its category is selected.

```
[UnityTest]
[Explicit, Category("integration")]
public IEnumerator MySlowTest()
{
...
}
```

In practice, this means that if you give some long-running tests the category “integration”, then they will only be run if the “integration” category is selected. This makes it possible to keep “All tests” running relatively fast, even on a large project. It is also possible to specify the `[Explicit]` and `[Category]` attributes on a class level, which then applies to all tests in the class and on an assembly level, which applied to all tests inside that assembly. An example with it applied to assemblies:

```
[assembly:Explicit]
[assembly:Category("integration")]
```

It is a good practice to have assembly level attributes defined in an `AssemblyInfo.cs` file.

## Exercise

Import the [sample](test-framework-general-introduction.html#import-samples "test-framework-general-introduction.html#import-samples") `10_LongRunningTests`, which is set up with a test assembly for Play Mode.

The exercise is to add a new `UnityTest`, which yields back a `WaitForSeconds` command and then tag it accordingly with `[Category]` and `[Explicit]` tags.

When pressing **RunAll**, the test should be skipped. When the Category is selected in the category drop down in the UI, then the test should not be skipped when **RunAll** is selected.

## Solution

The sample `10_LongRunningTests_Solution` contains the solution.

The implemented test can look like this:

```
[UnityTest]
[Explicit, Category("integration")]
public IEnumerator ASlowTest()
{
 yield return new WaitForSeconds(5);
}
```

## Additional resources

* [Nunit Category attribute](https://docs.nunit.org/articles/nunit/writing-tests/attributes/category.html "https://docs.nunit.org/articles/nunit/writing-tests/attributes/category.html")

9. Using the UnityTest Attribute

11. Scene-based tests

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/semantic-test-assertion.html

* [Programming in Unity](../../scripting.html "../../scripting.html")
* [Testing your code](../../test-framework/test-framework-introduction.html "../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../test-framework/course/overview.html "../../test-framework/course/overview.html")
* [General introduction to Unity Test Framework](../../test-framework/course/test-framework-general-introduction.html "../../test-framework/course/test-framework-general-introduction.html")
* 3. Semantic test assertion

2. Arrange, Act, Assert

4. Custom comparison

# 3. Semantic test assertion

## Learning objectives

This exercise introduces the `Assert.That` and related classes.

## Intro and motivation

The NUnit test framework and the Unity Test Framework have a series of classes for asserting objects in a way that is closer to natural language. This makes the statements easily readable.

Here are some examples on how to use the semantic assertion classes:

```
Assert.That(myValue, Is.GreaterThan(20));
Assert.That(str, Does.Contain("a string").And.Contain("something else"));
```

Here we check that the variable `myValue` is greater than 20 and then that the string `str` contains both “a string” and “something else”.

The semantic assertion is also known as [Constraint Model](https://docs.nunit.org/articles/nunit/writing-tests/assertions/assertion-models/constraint.html "https://docs.nunit.org/articles/nunit/writing-tests/assertions/assertion-models/constraint.html"). Other than `It` and `Does` there are multiple other keywords that can be used.

## Exercise

In the `3_SemanticTestAssertion` [sample](test-framework-general-introduction.html#import-samples "test-framework-general-introduction.html#import-samples"), there is a class called `ValueOutputter`, which returns values of different types.

Write tests that assert on the different outputs. It should be verified that:

* `GetInt()` returns 11.
* `GetString()` returns a string that contains the words `string` and `asserted`.
* `GetFloat()` returns a value that is around 19.33.

## Hints

* Asserting on the float might require a check for the value being greater than 19.33 and less than 19.34, as the output is not rational.

## Solution

A full solution to the exercise is available in the sample `3_SemanticTestAssertion_Solution`.

```
internal class ValueOutputterTests
{
 [Test]
 public void GivesExpectedInt()
 {
  var outputterUnderTest = new ValueOutputter();

  var number = outputterUnderTest.GetInt();
  
  Assert.That(number, Is.EqualTo(11));
 }
 
 [Test]
 public void GivesExpectedString()
 {
  var outputterUnderTest = new ValueOutputter();

  var str = outputterUnderTest.GetString();
  
  Assert.That(str, Does.Contain("string").And.Contain("asserted"));
 }
 
 [Test]
 public void GivesExpectedFloat()
 {
  var outputterUnderTest = new ValueOutputter();

  var number = outputterUnderTest.GetFloat();
  
  Assert.That(number, Is.GreaterThan(19.33f).And.LessThan(19.34f));
 }
}
```

## Additional resources

* [Constraint-Based Assert Model](https://nunit.org/docs/2.4/constraintModel.html "https://nunit.org/docs/2.4/constraintModel.html")

2. Arrange, Act, Assert

4. Custom comparison

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/play-mode-tests-in-player.html

* [Programming in Unity](../../scripting.html "../../scripting.html")
* [Testing your code](../../test-framework/test-framework-introduction.html "../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../test-framework/course/overview.html "../../test-framework/course/overview.html")
* [General introduction to Unity Test Framework](../../test-framework/course/test-framework-general-introduction.html "../../test-framework/course/test-framework-general-introduction.html")
* 8. PlayMode tests in a Player

7. PlayMode tests

9. Using the UnityTest Attribute

# 8. PlayMode tests in a Player

## Learning objectives

This section will teach you how to run Play Mode tests in a Standalone player on your machine.

## Intro and motivation

A huge area in our quality assurance using automated testing is the ability to test on different types of platforms. This is both useful for us and our customers, allowing them to verify their application on everything from phones to consoles.

The simplest setup to run on a platform is to run as standalone on your own computer. If you have the Unity standalone platform support for your OS installed, then you can run your Play Mode tests by clicking the **Run all in player** button. For more detailed instructions, see [Run play mode tests in a standalone player](../workflow-run-playmode-test-standalone.html "../workflow-run-playmode-test-standalone.html").

## Exercise

Import the [sample](test-framework-general-introduction.html#import-samples "test-framework-general-introduction.html#import-samples") `8_PlayModeTests_InPlayer`.

This project contains the solution to the previous exercise, which is just a simple Play Mode test.

Execute the test in your standalone player by clicking the **Run all in player** button in the Play Mode tab.

7. PlayMode tests

9. Using the UnityTest Attribute

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/custom-attributes.html

* [Programming in Unity](../../scripting.html "../../scripting.html")
* [Testing your code](../../test-framework/test-framework-introduction.html "../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../test-framework/course/overview.html "../../test-framework/course/overview.html")
* [General introduction to Unity Test Framework](../../test-framework/course/test-framework-general-introduction.html "../../test-framework/course/test-framework-general-introduction.html")
* 16. Custom attributes

15. Test cases

17. Running tests programmatically

# 16. Custom attributes

## Learning objectives

In this section we will look at some ways of implementing custom NUnit attributes, which can be used to alter test execution.

## Intro and motivation

A powerful part of NUnit is that it is very extendable. One of the ways it can be extended is through custom attributes. An example is attributes that implement the [IWrapTestMethod](https://docs.nunit.org/articles/nunit/extending-nunit/ICommandWrapper-Interface.html "https://docs.nunit.org/articles/nunit/extending-nunit/ICommandWrapper-Interface.html") interface. This interface has a method for wrapping a `TestCommand`, which implements a method for executing. Normally these test commands do something, call execute on their inner command and then maybe do something again after the inner command is completed.

In the following three classes an `IWrapTestMethod` interface is implemented and used in a test:

```
public class MyAttribute : NUnitAttribute, IWrapTestMethod
{
 public TestCommand Wrap(TestCommand command)
 {
  return new MyCommand(command);
 }
}

public class MyCommand : TestCommand
{
 private TestCommand innerCommand;
 
 public MyCommand(TestCommand command) : base(command.Test)
 {
  innerCommand = command;
 }

 public override TestResult Execute(ITestExecutionContext context)
 {
  Debug.Log("Before");
  var result = innerCommand.Execute(context);
  Debug.Log("After");

  return result;
 }
}

public class MyTests
{
 [Test]
 [MyAttribute]
 public void Test1()
 {
  Debug.Log("The test");
 }
}
```

When running `MyTests.Test1` the following output is printed:

Test1 (0,017s)  
-–  
Before  
The test  
After

Other interfaces that custom attributes can implement are `IWrapSetUpTearDown`, `IApplyToContext`, and `IApplyToTest`.

## Exercise

At Unity we have a goal that an action should never take longer than 500 ms. In the [sample](test-framework-general-introduction.html#import-samples "test-framework-general-introduction.html#import-samples") `16_CustomAttributes` there is a class called `MyClass`, which has two methods. Both methods are supposed to return true. However someone has made a regression so that one of the two methods takes a long time to run.

The task is to create a new custom attribute, which detects if the test takes longer than 500 ms to run. If that happens, it should fail the test with a descriptive message. Apply that to the two existing tests.

## Hints

* You can use the class `System.Diagnostics.Stopwatch` to time how many miliseconds have passed.

## Solution

A full solution for the exercise is availiable at `16_CustomAttributes_Solution`.

The core of the solution is the execute method in the test command implementation:

```
public override TestResult Execute(ITestExecutionContext context)
{
 var stopWatch = new Stopwatch();
 stopWatch.Start();
 var result = innerCommand.Execute(context);
 stopWatch.Stop();

 if (stopWatch.ElapsedMilliseconds > 500)
 {
  result.SetResult(ResultState.Failure, $"Test took {stopWatch.ElapsedMilliseconds} ms. That is longer than 500ms!");
 }

 return result;
}
```

15. Test cases

17. Running tests programmatically

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/overview.html

* [Programming in Unity](../../scripting.html "../../scripting.html")
* [Testing your code](../../test-framework/test-framework-introduction.html "../../test-framework/test-framework-introduction.html")
* Unity Test Framework learning materials

Modifying a Player build for tests

General introduction to Unity Test Framework

# Unity Test Framework learning materials

Learn how to use Unity Test Framework through a series of applied exercises.

| **Topic** | **Description** |
| --- | --- |
| **[Unity Test Framework General Introduction](test-framework-general-introduction.html "test-framework-general-introduction.html")** | Try out some of Unity Test Framework’s core features through general examples. Each exercise in this course is accompanied by a sample project and corresponding solution, which you can import from the Package Manager window. |
| **[Testing Lost Crypt](LostCrypt/lost-crypt-introduction.html "LostCrypt/lost-crypt-introduction.html")** | Use the Unity Test Framework to test an actual game project. It’s recommended to complete the General Introduction before attempting Testing Lost Crypt. |

## Additional resources

* [Writing tests](../writing-tests.html "../writing-tests.html")
* [Running tests](../running-tests.html "../running-tests.html")

Modifying a Player build for tests

General introduction to Unity Test Framework

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/test-cases.html

* [Programming in Unity](../../scripting.html "../../scripting.html")
* [Testing your code](../../test-framework/test-framework-introduction.html "../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../test-framework/course/overview.html "../../test-framework/course/overview.html")
* [General introduction to Unity Test Framework](../../test-framework/course/test-framework-general-introduction.html "../../test-framework/course/test-framework-general-introduction.html")
* 15. Test cases

14. Preserve test state

16. Custom attributes

# 15. Test cases

## Learning objectives

This section will cover `[TestCase]` and similar NUnit attributes and how to work with them in UnityTests.

## Intro and motivation

NUnit has a few tools for parameterized tests, which can be used to specify test cases with variating parameters. This can drastically reduce the amount of repeated code and make the test cleaner to use.

An example of a parameterized test using the `[TestCase]` attribute:

```
[Test]
[TestCase(49, "a string", true)]
[TestCase(9, "something", false)]
public void MyTest(int firstValue, string secondValue, bool expectedOutcome)
{
 ...
}
```

This will generate two tests, each with a different input to the method body.

In addition to the `[TestCase]` attribute, NUnit also has a `[Values]` attribute, which specifies a set of values on each individual input. An example of such is:

```
[Test]
public void MyTest([Values(49, 9)]int firstValue, [Values("a string", "something")]string secondValue)
{
 ...
}
```

When specifying multiple input parameters, they are treated as combinatorial. That means that each combination of them will be tested. For the above example, that will result in a total of 4 cases:

```
MyTest(49, "a string")
MyTest(49, "something")
MyTest(9, "a string")
MyTest(9, "something")
```

This can easily explode into many combinations. The combinations might not all be valuable and would just waste time, so use this with care.

For both the `[TestCase]` and `[Values]` attributes, there is a more dynamic version called `[TestCaseSource]` and `[ValueSource]` accordingly. These each take in a static method or array, returning a collection of objects.

Of these 4 methods, the `[ValueSource]` attribute is currently the only one supported by `[UnityTest]`. Since this would produce combinational tests, if multiple arguments with `[ValueSource]` are provided, then it is recommended to make a test case struct, if multiple arguments are needed for the test. An example of such could look like this:

```
[UnityTest]
public IEnumerator AddAsyncCalculatesCorrectValue([ValueSource(nameof(TestCases))] TestCase testCase)
{
 ...
}

private static IEnumerable TestCases()
{
 yield return new TestCase {value1 = 4, value2 = "a string"};
 yield return new TestCase {value1 = 8, value2 = "another string"};
}

public struct TestCase
{
 public int value1;
 public string value2;

 public override string ToString()
 {
  return $"{value1}, {value2}";
 }
}
```

## Exercise

In the [sample](test-framework-general-introduction.html#import-samples "test-framework-general-introduction.html#import-samples") `15_TestCases` a class is set up with some basic math. It has two methods:

* `Add` which takes two integers and adds them together.
* `AddAsync` also adds two integers together, but does so asynchronously, yielding back an `IEnumerator`

The task is to add tests for the two methods. The `AddAsync` method first returns the result after a few frames, so that will be best suited for a `[UnityTest]`. Note that it is not enough to yield back the `IEnumerator`, as the test framework does not curently support nested yields. Instead, create a loop to move over each element until it’s done. At each step of the while loop, let the test yield back null.

## Hints

* The `ToString()` implementation in the struct is there to provide readable info in the test runner treeview. Without it, it would just show the struct name as the test argument for every case.

## Solution

A solution for the exercise is available in the sample `15_TestCases_Solution`. Tests for both methods can be implemented as follows:

```
[Test]
[TestCase(24, 80, 104)]
[TestCase(10, -15, -5)]
[TestCase(int.MaxValue, 10, int.MinValue + 9)]
public void AddCalculatesCorrectValue(int valueA, int valueB, int expectedResult)
{
 var myClass = new MyClass();

 var result = myClass.Add(valueA, valueB);
 
 Assert.That(result, Is.EqualTo(expectedResult));
}

[UnityTest]
public IEnumerator AddAsyncCalculatesCorrectValue([ValueSource(nameof(AdditionCases))] AddCase addCase)
{
 var myClass = new MyClass();

 var enumerator = myClass.AddAsync(addCase.valueA, addCase.valueB);
 while (enumerator.MoveNext())
 {
  yield return null;
 }
 var result = enumerator.Current;
 
 Assert.That(result, Is.EqualTo(addCase.expectedResult));
}

private static IEnumerable AdditionCases()
{
 yield return new AddCase {valueA = 24, valueB = 80, expectedResult = 104};
 yield return new AddCase {valueA = 10, valueB = -15, expectedResult = -5};
 yield return new AddCase {valueA = int.MaxValue, valueB = 10, expectedResult = int.MinValue + 9};
}

public struct AddCase
{
 public int valueA;
 public int valueB;
 public int expectedResult;

 public override string ToString()
 {
  return $"{valueA} + {valueB} = {expectedResult}";
 }
}
```

14. Preserve test state

16. Custom attributes

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/test-framework-general-introduction.html

* [Programming in Unity](../../scripting.html "../../scripting.html")
* [Testing your code](../../test-framework/test-framework-introduction.html "../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../test-framework/course/overview.html "../../test-framework/course/overview.html")
* General introduction to Unity Test Framework

Unity Test Framework learning materials

1. Running a test in a Unity project

# General introduction to Unity Test Framework

Welcome to the Unity Test Framework general introduction course.

This course consists of different exercises to help you learn fundamental Unity Test Framework concepts through practical examples. Each exercise has a **Learning Objectives** section to help you identify the skills you will learn. The exercises are grouped thematically, and their difficulty varies.

After completing an exercise, you can check your solution against the one provided. Note that many of the exercises can be solved in several possible ways.

## Import samples

Project files for each exercise and its accompanying solution are provided as samples with the Unity Test Framework package. To import an exercise or solution to your Unity Editor:

1. Go to **Window > Package Manager** and, in the [packages list view](https://docs.unity3d.com/Manual/upm-ui-list.html "https://docs.unity3d.com/Manual/upm-ui-list.html"), selct Unity Test Framework.
2. In the package [details view](https://docs.unity3d.com/Manual/upm-ui-details.html "https://docs.unity3d.com/Manual/upm-ui-details.html"), find the **Samples** section.
3. Find the exercise or solution you want to import and click the import button.

![The Package Manager window with the expanded list of package samples available for import.](../../../uploads/Main/test-framework/samples.png)


The Package Manager window with the expanded list of package samples available for import.

**Note**: You can import an exercise and its solution or multiple exercises at the same time, but since several of the exercises use the same naming pattern this will likely result in compilation errors that prevent you running tests or building your project. The recommended workflow is to import and work on one exercise at a time. If you import additional exercises or solutions for reference, you can delete them again before running your main exercise.

## Course outline

| **Topic** | **Description** |
| --- | --- |
| **[Running a test in a Unity project](running-test.html "running-test.html")** | Set up a simple Unity project with a test assembly and tests and run them from the **Test Runner** window. |
| **[Arrange, act, assert](arrange-act-assert.html "arrange-act-assert.html")** | Use the core unit testing principle of AAA (Arrange, Act, Assert) to structure your unit tests. |
| **[Semantic test assertion](semantic-test-assertion.html "semantic-test-assertion.html")** | Use `Assert.That` to test whether conditions are true. |
| **[Custom comparison](custom-comparison.html "custom-comparison.html")** | Use the Unity Test Framework’s custom equality comparers to check for value equality of Unity types. |
| **[Asserting logs](asserting-logs.html "asserting-logs.html")** | Test and verify code that writes to the console log. |
| **[Setup and teardown](setup-teardown.html "setup-teardown.html")** | Use the NUnit attributes `[SetUp]` and `[TearDown]` to reduce code duplication in your tests. |
| **[Play mode tests](play-mode-tests.html "play-mode-tests.html")** | Create and run Play mode tests. |
| **[Play mode tests in a player](play-mode-tests-in-player.html "play-mode-tests-in-player.html")** | Run Play mode tests in a standalone platform Player. |
| **[Using the UnityTest attribute](unitytest-attribute.html "unitytest-attribute.html")** | Use the `[UnityTest]` to write tests that run across multiple frames. |
| **[Long-running tests](long-running-tests.html "long-running-tests.html")** | Write long-running tests that can instruct the Editor to wait for a defined period of time. |
| **[Scene-based tests](scene-based-tests.html "scene-based-tests.html")** | Test content that is stored in a scene. |
| **[Setup and cleanup at build time](build-setup-cleanup.html "build-setup-cleanup.html")** | Perform work before and after the Player build phase. |
| **[Domain reload](domain-reload.html "domain-reload.html")** | Invoke and wait for domain reload from your tests. |
| **[Preserve test state](preserve-test-state.html "preserve-test-state.html")** | Make data in your tests survive domain reloads using serialization. |
| **[Test cases](test-cases.html "test-cases.html")** | Work with NUnit’s `[TestCase]` attribute in Unity tests. |
| **[Custom attributes](custom-attributes.html "custom-attributes.html")** | Implement custom NUnit attributes, which can be used to alter test execution. |
| **[Running tests programmatically](running-tests-programmatically.html "running-tests-programmatically.html")** | Run tests from code using the [TestRunnerAPI](https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEditor.TestTools.TestRunner.Api.TestRunnerApi.html "https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEditor.TestTools.TestRunner.Api.TestRunnerApi.html"). |

## Additional resources

* [Testing Lost Crypt](LostCrypt/lost-crypt-introduction.html "LostCrypt/lost-crypt-introduction.html")

Unity Test Framework learning materials

1. Running a test in a Unity project

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/unitytest-attribute.html

* [Programming in Unity](../../scripting.html "../../scripting.html")
* [Testing your code](../../test-framework/test-framework-introduction.html "../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../test-framework/course/overview.html "../../test-framework/course/overview.html")
* [General introduction to Unity Test Framework](../../test-framework/course/test-framework-general-introduction.html "../../test-framework/course/test-framework-general-introduction.html")
* 9. Using the UnityTest Attribute

8. PlayMode tests in a Player

10. Long running tests

# 9. Using the UnityTest Attribute

## Learning objectives

This section will introduce you to the custom `[UnityTest]` Attribute, which allows for creating tests that run over multiple frames.

## Intro and motivation

An important extension to the Nunit framework that we’ve made is introducing the `[UnityTest]` attribute. The attribute allows for creating tests that can yield and resume running after a certain condition. Therefore the test must have the return type of `IEnumerator`. You can then yield back a yield instruction or null, like so:

```
[UnityTest]
public IEnumerator MyTest()
{
 DoSomething();
 // Skip 1 frame.
 yield return null;
 DoSomethingElse();
}
```

In the snippet above we call the `DoSomething` method, then skip one frame before calling the `DoSomethingElse` method.

For more information on the yield keyword in C#, see the [Microsoft documentation](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/yield "https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/yield").

## Exercise

In the [sample](test-framework-general-introduction.html#import-samples "test-framework-general-introduction.html#import-samples") `9_UnityTestAttribute` you will find a Play Mode test assembly set up with one Play Mode test in it. The PlayMode test does not have a body yet, but there is a function called `PrepareCube()` which will set up a cube with some physics applied.

The task is to initialize the cube and then verify that it has moved after one frame has passed.

## Solution

The full solution is available in the `9_UnityTestAttribute_Solution` sample.

```
[UnityTest]
public IEnumerator CubeMovesDown()
{
 var cubeUnderTest = PrepareCube();
 var initialPosition = cubeUnderTest.transform.position;

 yield return null;

 Assert.That(cubeUnderTest.transform.position, Is.Not.EqualTo(initialPosition));
}
```

## Additional resources

[UnityTest attribute](https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.UnityTestAttribute.html "https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.UnityTestAttribute.html")

8. PlayMode tests in a Player

10. Long running tests

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/build-setup-cleanup.html

* [Programming in Unity](../../scripting.html "../../scripting.html")
* [Testing your code](../../test-framework/test-framework-introduction.html "../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../test-framework/course/overview.html "../../test-framework/course/overview.html")
* [General introduction to Unity Test Framework](../../test-framework/course/test-framework-general-introduction.html "../../test-framework/course/test-framework-general-introduction.html")
* 12. Setup and cleanup at build time

11. Scene-based tests

13. Domain reload

# 12. Setup and cleanup at build time

## Learning objectives

This section will introduce you to the hooks in the test framework for before and after the player build.

## Intro and motivation

Sometimes it’s necessary to change settings or prepare assets before a build for Play Mode tests. Similarly, it might be relevant to clean up things after the build. For this the test framework has two hookup points called [PrebuildSetup and PostBuildCleanup](https://docs.unity3d.com/Packages/com.unity.test-framework@1.1/manual/reference-setup-and-cleanup.html "https://docs.unity3d.com/Packages/com.unity.test-framework@1.1/manual/reference-setup-and-cleanup.html").

In the Editor, the `PrebuildSetup` is invoked before the build and test run and the `PostBuildCleanup` is invoked after the tests are completely done. This happens for both Edit Mode and Play Mode tests. When running Play Mode tests on a device, the Cleanup is already run right after the build is done, as the tests are happening in parallel on the device.

The simplest way of ensuring a test has a `PrebuildSetup` and `PostBuildCleanup` is by implementing `IPrebuildSetup` and `IPostBuildCleanup` respectively in your test class.

Often the setup and cleanup will be interacting with code in the `UnityEditor` assemblies. These are not available when running on a device, but we want our built-in setup and cleanup code to stay in the test class. For this, it’s recommended to wrap the Editor-related code lines in `#if UNITY_EDITOR` defines. For example:

```
public class MyTestClass : IPrebuildSetup
{
 [Test]
 public void MyTest()
 {
 
 }

 public void Setup()
 {
 #if UNITY_EDITOR
   UnityEditor.EditorSettings.serializationMode = SerializationMode.ForceText;
 #endif
 }
}
```

**Note**: If the Editor code is not wrapped, then you won’t see any compilation error when running in the Editor, but you will see the compilation error once you try to run the test in a player.

## Exercise

The sample `12_BuildSetupCleanup` contains a Play Mode test for verifying the content of a scene. It is essentially the Play Mode version of the test from the previous exercise.

The test fails because the scene can’t be found. It could be solved by adding the scene to the build settings, but it’s not good practise to add a test-related scene to the build settings, as it could get included when building for non-testing purposes.

Therefore the task is to create a `PrebuildSetup` that adds the scene to `EditorBuildSettings` and a `PostBuildCleanup` that removes it again.

Test the solution by running the test both in the Editor and in a standalone player. You will need to use `#if UNITY_EDITOR` to make the code compile for the player.

## Hints

* The `IPrebuildSetup` interface requires a `Setup` method, so be careful that there are no `[SetUp]` methods already called that.

## Solution

A full solution is available in the [sample](test-framework-general-introduction.html#import-samples "test-framework-general-introduction.html#import-samples") `12_BuildSetupCleanup_Solution`.

The full test solution can be done like this:

```
using System.Collections;
using System.Linq;
using NUnit.Framework;
#if UNITY_EDITOR
using UnityEditor;
#endif
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.TestTools;

namespace Tests
{
 public class SceneTests : IPrebuildSetup, IPostBuildCleanup
 {
  private string originalScene;
  private const string k_SceneName = "Assets/MyGameScene.unity";

  public void Setup()
  {
#if UNITY_EDITOR
   if (EditorBuildSettings.scenes.Any(scene => scene.path == k_SceneName))
   {
    return;
   }
   
   var includedScenes = EditorBuildSettings.scenes.ToList();
   includedScenes.Add(new EditorBuildSettingsScene(k_SceneName, true));
   EditorBuildSettings.scenes = includedScenes.ToArray();
#endif
  }

  [UnitySetUp]
  public IEnumerator SetupBeforeTest()
  {
   originalScene = SceneManager.GetActiveScene().path;
   SceneManager.LoadScene(k_SceneName);
   yield return null; // Skip a frame
  }

  [Test]
  public void VerifyScene()
  {
   var gameObject = GameObject.Find("GameObjectToTestFor");

   Assert.That(gameObject, Is.Not.Null, $"GameObjectToTestFor not found in {SceneManager.GetActiveScene().path}.");
  }

  [TearDown]
  public void TeardownAfterTest()
  {
   SceneManager.LoadScene(originalScene);
  }

  public void Cleanup()
  {
#if UNITY_EDITOR
   EditorBuildSettings.scenes = EditorBuildSettings.scenes.Where(scene => scene.path != k_SceneName).ToArray();
#endif
  }
 }
}
```

Note that `#if UNITY_EDITOR` is also used among the using statements, to allow for a using reference to `UnityEditor`.

## Additional resources

* [Setting up and cleaning up at build time](../reference-setup-and-cleanup.html "../reference-setup-and-cleanup.html").

11. Scene-based tests

13. Domain reload

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/preserve-test-state.html

* [Programming in Unity](../../scripting.html "../../scripting.html")
* [Testing your code](../../test-framework/test-framework-introduction.html "../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../test-framework/course/overview.html "../../test-framework/course/overview.html")
* [General introduction to Unity Test Framework](../../test-framework/course/test-framework-general-introduction.html "../../test-framework/course/test-framework-general-introduction.html")
* 14. Preserve test state

13. Domain reload

15. Test cases

# 14. Preserve test state

## Learning objectives

This section will cover how to let variables and information in your tests survive domain reloads using serialization.

## Intro and motivation

When a domain reload happens, all scripts are reloaded. That also means that most data in members of the test class are lost. In some cases that is an issue, as you might want to retain some information during a domain reload.

The solution to that is serialization. If you add a `[SerializeField]` attribute to the field in question, then it will retain its value. Note that there are some limitations to serialization in Unity, see [Unity Serialization](../../script-serialization.html "../../script-serialization.html").

## Exercise

The [sample](test-framework-general-introduction.html#import-samples "test-framework-general-introduction.html#import-samples") `14_PreserveTestState` contains the solution for the previous assignment, with one exception; the file name is now a guid.

This means that in order to clean up correctly, the `TearDown` method needs to know the filename.

Currently, when running the test for the first time, the `TearDown` will fail because it’s not given a file name. On subsequent runs of the test, it will fail due to duplicate files with the same C# script in it.

The task is to fix this loss of the file name info by using serialization.

## Solution

The solution is simple. Just add a `[SerializeField]` attribute to the filename field. The solution is included as sample `14_PreserveTestState_Solution.`

13. Domain reload

15. Test cases

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/play-mode-tests.html

* [Programming in Unity](../../scripting.html "../../scripting.html")
* [Testing your code](../../test-framework/test-framework-introduction.html "../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../test-framework/course/overview.html "../../test-framework/course/overview.html")
* [General introduction to Unity Test Framework](../../test-framework/course/test-framework-general-introduction.html "../../test-framework/course/test-framework-general-introduction.html")
* 7. PlayMode tests

6. SetUp and TearDown

8. PlayMode tests in a Player

# 7. PlayMode tests

## Learning objectives

This exercise introduces the concept of Play Mode tests and will teach you:

* When to use Play Mode tests.
* How to set up an assembly definition for PlayMode tests.
* How to run tests in Play Mode.

## Intro and motivation

Managed code in Unity generally exists in two different modes: Edit Mode and Play Mode. Edit Mode is code executing inside the Editor, which includes things like our UIs and underlying logic. Play Mode is when the game or 3D application is playing, which is either when the user presses the play button in the Editor or when the code runs in a standalone player.

We have distinct tests for each mode because how they run and what they can access is different in each case. Methods from a given API may only be available in one mode. Due to this distinction, tests for Edit Mode and Play Mode are in different assemblies.

You can create a Play Mode test assembly by following the instructions in the Play Mode tab of the Test Runner UI. Detailed instructions are available in the [Getting started section](../workflow-create-test.html "../workflow-create-test.html"). The difference in the assembly definition between Edit Mode and Play Mode is what platforms they are enabled for. An Edit Mode test assembly is only enabled for the `Editor` platform. Enabling any other platforms automatically makes it a Play Mode test assembly, as tests can now run on other platforms. By default, Play Mode tests are set to run on all platforms.

## Exercise

The [sample](test-framework-general-introduction.html#import-samples "test-framework-general-introduction.html#import-samples") `7_PlayModeTests` contains an empty project. Import this sample and add a new assembly for Play Mode tests.

Afterwards add a test which just asserts that `Application.isPlaying` is true. This flag will only be true when in Play Mode.

Run the test. Notice that your Editor enters Play Mode (the equivalent of pressing the play button) while the test is running and exits Play Mode afterward.

## Solution

A full solution with the test and assembly setup is available in the `7_PlayModeTests_Solution` sample.

## Additional resources

* [Edit mode and Play mode tests](../edit-mode-vs-play-mode-tests.html "../edit-mode-vs-play-mode-tests.html")

6. SetUp and TearDown

8. PlayMode tests in a Player

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/asserting-logs.html

* [Programming in Unity](../../scripting.html "../../scripting.html")
* [Testing your code](../../test-framework/test-framework-introduction.html "../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../test-framework/course/overview.html "../../test-framework/course/overview.html")
* [General introduction to Unity Test Framework](../../test-framework/course/test-framework-general-introduction.html "../../test-framework/course/test-framework-general-introduction.html")
* 5. Asserting and expecting logs

4. Custom comparison

6. SetUp and TearDown

# 5. Asserting and expecting logs

## Learning objectives

How to test and verify code that writes to the console log.

## Intro and motivation

At Unity, we have many packages and modules that communicate with the user through logging messages and exceptions to the console log. This can be both for the normal workflows and for error cases.

We have extended the test framework to be aware of the console log. This means that by default, any error or exception that is logged while running a test will result in that test failing. If such failures are expected, then it is possible to use `LogAssert.Expect(logtype, message)` to ensure that a given message is logged. This can be used to expect normal messages and warnings as well. The `LogAssert.Expect` can be placed both before and after the message happens. When the test is done (or next time it yields), it will fail if the expected message is not present.

```
[Test]
public void LogAssertExample()
{
 // Expect a regular log message
 LogAssert.Expect(LogType.Log, "Log message");

 // The test fails without the following expected log message
 Debug.Log("Log message");

 // An error log
 Debug.LogError("Error message");

 // Without expecting an error log, the test would fail
 LogAssert.Expect(LogType.Error, "Error message");
}
```

The `LogAssert.Expect` also takes a regex as an argument, as sometimes it is not possible to know the precise string. For example, if the logged message has time duration in the string.

## Exercise

In the [sample](test-framework-general-introduction.html#import-samples "test-framework-general-introduction.html#import-samples") `5_AssertingLogs` there is a class called `MyLoggingClass`.

The class has two methods with the following behavior:

* `DoSomething();` logs the message “Doing something”.
* `DoSomethingElse();` logs an error “An error happened. Code: #” where # is a random number from 0 to 9.

Write tests that verify the above behavior using `LogAssert.Expect`. You can experiment by seeing what happens if `DoSomethingElse();` is called without the expect and what happens if you expect e.g. a message of type warning.

## Hints

* You will need to use a regular expression together with `LogAssert.Expect` in order to expect the error message.
* In Unity, there is a difference between a logged error and a logged exception.

## Solution

A full solution to the exercise can be found in the sample `5_AssertingLogs_Solution`.

One possible implementation of the tests is as follows:

```
[Test]
public void DoSomethingLogsMessage()
{
 var loggingClassUnderTest = new MyLoggingClass();
 
 loggingClassUnderTest.DoSomething();
 
 LogAssert.Expect(LogType.Log, "Doing something");
}

[Test]
public void DoSomethingElseLogsError()
{
 var loggingClassUnderTest = new MyLoggingClass();
 
 loggingClassUnderTest.DoSomethingElse();
 
 LogAssert.Expect(LogType.Error, new Regex("An error happened. Code: \\d"));
}
```

## Additional resources

[API reference for `LogAssert`](https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.LogAssert.html "https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.LogAssert.html")

4. Custom comparison

6. SetUp and TearDown

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/arrange-act-assert.html

* [Programming in Unity](../../scripting.html "../../scripting.html")
* [Testing your code](../../test-framework/test-framework-introduction.html "../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../test-framework/course/overview.html "../../test-framework/course/overview.html")
* [General introduction to Unity Test Framework](../../test-framework/course/test-framework-general-introduction.html "../../test-framework/course/test-framework-general-introduction.html")
* 2. Arrange, Act, Assert

1. Running a test in a Unity project

3. Semantic test assertion

# 2. Arrange, Act, Assert

## Learning Objectives

In this exercise, you will learn about the core unit testing principle of AAA (Arrange, Act, Assert), which will help you structure your unit test.

## Intro and Motivation

The Arrange, Act, Assert concept is an industry standard in unit testing. It allows for a clear distinction of the code for setting up your test, carrying out the test, and evaluation. Using this can make your test more readable both for yourself and for your colleagues.

In the first part of the code, we arrange all the elements needed for the test. In the middle part, we act on the object that is under test. In the final part, we assert on the result of the act part. The three parts of the code are usually separated by an empty line.

An example of Arrange, Act, Assert could look like the following:

```
[Test]
public void StringWriterTest()
{
 // Arrange
 var stringWriterUnderTest = new StringWriter();
 stringWriterUnderTest.NewLine = "\\n";
 var testStringA = "I am testing";
 var testStringB = "with new line";

 // Act
 stringWriterUnderTest.WriteLine(testStringA);
 stringWriterUnderTest.WriteLine(testStringB);

 // Assert
 Assert.AreEqual("I am testing\\nwith new line\\n", stringWriterUnderTest.ToString());
}
```

It is good practice to use `XUnderTest` as a variable name of the class that is being tested. This helps to keep the focus of the test clean.

The Act part of the code should have as few lines as possible, reflecting what is actually being tested. The assert should in the optimal case only contain assert calls, but it can also be necessary to include some lines of logic to allow for the assertion.

## Exercise

Import the [sample](test-framework-general-introduction.html#import-samples "test-framework-general-introduction.html#import-samples") `2_ActArrangeAssert` into your Unity Editor (version 2019.2 or newer) from the Package Manager window.

In this project we have a class called `StringFormatter`. It has two methods of interest: `void Configure(string joinDelimiter)` and `string Join(object[] args)`.

The goal of this exercise is to write one or more tests, testing the `Join` method. For example, testing that it can join with a “;” (semicolon) delimiter.

## Hints

* Setup of the test input and the call to `Configure(";")` would go into the `Arrange` part of your test.
* It is good practice to separate the three parts of your test (arrange, act and assert) with a blank line.

## Solution

The exercise can be solved with a test like the following:

```
[Test]
public void JoinsObjectsWithSemiColon()
{
 // Arrange
 var formatterUnderTest = new StringFormatter();
 formatterUnderTest.Configure(";");
 var objects = new object[] {"a", "bc", 5, "d"};
 
 // Act
 var result = formatterUnderTest.Join(objects);
 
 // Assert
 Assert.AreEqual("a;bc;5;d", result);
}
```

A full project with the solution can be found in the sample `2_ActArrangeAssert_Solution.`

## Addional resources

* [Arranging your tests](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices#arranging-your-tests "https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices#arranging-your-tests")

1. Running a test in a Unity project

3. Semantic test assertion

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/domain-reload.html

* [Programming in Unity](../../scripting.html "../../scripting.html")
* [Testing your code](../../test-framework/test-framework-introduction.html "../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../test-framework/course/overview.html "../../test-framework/course/overview.html")
* [General introduction to Unity Test Framework](../../test-framework/course/test-framework-general-introduction.html "../../test-framework/course/test-framework-general-introduction.html")
* 13. Domain reload

12. Setup and cleanup at build time

14. Preserve test state

# 13. Domain reload

## Learning objectives

In this section, you will learn how to invoke and wait for Domain Reloads.

## Intro and motivation

When performing actions that affect the scripts in a project, Unity performs a domain reload. Since a domain reload restarts all scripts, then it’s necessary to mark any expected domain reload by yielding a [`WaitForDomainReload`](https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.WaitForDomainReload.html "https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.WaitForDomainReload.html"). The command stops any further code execution and then resumes after the domain reload is done.

It’s also possible to yield a [`RecompileScripts`](https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.RecompileScripts.html "https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.RecompileScripts.html") command. This does the same as `WaitForDomainReload` except that it performs an `AssetDatabase.Reload()` call. Both calls can be configured to expect whether a script compilation is expected to succeed.

If a domain reload happens while a test is running without yielding one of these commands, then the test will fail with an error about an unexpected domain reload.

## Exercise

The [sample](test-framework-general-introduction.html#import-samples "test-framework-general-introduction.html#import-samples") `13_DomainReload_Solution` is set up with a test class called `ScriptAddingTests`.

The test has two helper methods already implemented:

* `CreateScript` creates a C# script with a class called `MyTempScript`. That has a method called `Verify`.
* `VerifyScript` instantiates an instance of `MyTempScript` using reflection and returns the value from the `Verify` method. The expected return value is the string “OK”.

After running `CreateScript` Unity now has a new C# file in the project and thus needs to recompile. The task is to create a test that calls `CreateScript`, handles the domain reload and then verifies the output from `VerifyScript`.

Remember that your script should also clean up after itself, by deleting the file and recompiling the script again. This is recommended to do in a `TearDown` or `UnityTearDown`, which will run even if the test fails.

> **Important**: After importing, you should **move the sample test folder** `Tests_13` into the `Assets` folder for this exercise to work.

## Hints

* If `RecompileScripts` is unavailable to you due to it being internal, then you need to upgrade the Unity Test Framework package to version 1.1.0 or higher.
* If you are on a non-Windows machine you might want to change paths inside **k\_fileName** or use C# [Path.Combine](https://docs.microsoft.com/en-us/dotnet/api/system.io.path.combine?view=net-6.0 "https://docs.microsoft.com/en-us/dotnet/api/system.io.path.combine?view=net-6.0") for more cross-platform safe code.

## Solution

A full solution is available in the sample `13_DomainReload_Solution`.

The test can be implemented as follows:

```
internal class ScriptAddingTests
{
 private const string k_fileName = @"Assets\\Tests\\TempScript.cs";
 
 [UnityTest]
 public IEnumerator CreatedScriptIsVerified()
 {
  CreateScript();
  yield return new RecompileScripts();

  var verification = VerifyScript();
  
  Assert.That(verification, Is.EqualTo("OK"));
 }

 [UnityTearDown]
 public IEnumerator Teardown()
 {
  if (!File.Exists(k_fileName))
  {
   yield break;
  }
  
  File.Delete(k_fileName);
  yield return new RecompileScripts();
 }
 
 private void CreateScript()
 {
  File.WriteAllText(k_fileName, @"
  public class MyTempScript {
   public string Verify()
   {
    return ""OK"";
   } 
  }");
 }

 private string VerifyScript()
 {
  Type type = Type.GetType("MyTempScript", true);
  
  object instance = Activator.CreateInstance(type);

  var verifyMethod = type.GetMethod("Verify", BindingFlags.Instance | BindingFlags.Public);

  var verifyResult = verifyMethod.Invoke(instance, new object[0]);
  return verifyResult as string;
 }
}
```

## Additional resources

[API reference for `RecompileScripts`](https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.RecompileScripts.html "https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.RecompileScripts.html")  
[API reference for `WaitForDomainReload`](https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.WaitForDomainReload.html "https://docs.unity3d.com/Packages/com.unity.test-framework@latest/index.html?subfolder=/api/UnityEngine.TestTools.WaitForDomainReload.html")

12. Setup and cleanup at build time

14. Preserve test state

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/custom-comparison.html

* [Programming in Unity](../../scripting.html "../../scripting.html")
* [Testing your code](../../test-framework/test-framework-introduction.html "../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../test-framework/course/overview.html "../../test-framework/course/overview.html")
* [General introduction to Unity Test Framework](../../test-framework/course/test-framework-general-introduction.html "../../test-framework/course/test-framework-general-introduction.html")
* 4. Custom comparison

3. Semantic test assertion

5. Asserting and expecting logs

# 4. Custom comparison

## Learning objectives

This exercise will cover the custom equality comparers included in Unity Test Framework, such as `Vector3EqualityComparer`. These are used to assert on e.g. Vectors.

## Intro and motivation

We have extended the assertion capabilities of NUnit with some custom comparisons for Unity-specific objects. A good example of this is the ability to compare two `Vector3` objects.

An example of its use is:

```
actual = new Vector3(0.01f, 0.01f, 0f);
expected = new Vector3(0.01f, 0.01f, 0f);

Assert.That(actual, Is.EqualTo(expected).Using(Vector3EqualityComparer.Instance));
```

This allows us to verify that the two vectors are identical within a given tolerence. By default the tolerance is 0.0001f. The tolerance can be changed by providing a new `Vector3EqualityComparer`, instead of using the default in .instance. For example you can up the tolerance to 0.01f with the following:

```
Assert.That(actual, Is.EqualTo(expected).Using(new Vector3EqualityComparer(0.01f));
```

For a list of all available custom comparers, see [Custom equality comparers](https://docs.unity3d.com/Packages/com.unity.test-framework@1.1/manual/reference-custom-equality-comparers.html "https://docs.unity3d.com/Packages/com.unity.test-framework@1.1/manual/reference-custom-equality-comparers.html").

## Exercise

Similar to the project for exercise 3, the [sample](test-framework-general-introduction.html#import-samples "test-framework-general-introduction.html#import-samples") `4_CustomComparison` contains a `ValueOutputter` class.

Verify that the `ValueOutputter` returns the correct values from its methods:

* `GetVector3()` should return a `Vector3` that is roughly equal to (10.333, 3, 9.666).
* `GetFloat()` should return a `float` that is roughly 19.333. This is the same as previous exercise, but you can try to solve this with a `FloatEqualityComparer`.
* `GetQuaternion` should return a [Quaternion](https://docs.unity3d.com/ScriptReference/Quaternion.html "https://docs.unity3d.com/ScriptReference/Quaternion.html")Unity’s standard way of representing rotations as data. When writing code that deals with rotations, you should usually use the Quaternion class and its methods. [More info](../../class-Quaternion.html "../../class-Quaternion.html")  
  See in [Glossary](../../Glossary.html#Quaternion "../../Glossary.html#Quaternion") object that should be roughly equal to (10f, 0f, 7.33333f, 0f).

## Hints

* For some of the exercises, you might need to provide a custom error tolerance to the comparer.
* If the comparison fails, the comparers give a message about the actual and expected value, just like a normal assertion. However, because `ToString` on `Vector3` rounds the value off before displaying it, the two values in the string message might be equal, even when their `Vector3` values are not.

## Solution

The full solution is available in the sample `4_CustomComparison_Solution`.

```
[Test]
public void Vector3ReturnsCorrectValue()
{
 var valueOutputterUnderTest = new ValueOutputter();

 var vector3 = valueOutputterUnderTest.GetVector3();

 var expected = new Vector3(10.333f, 3f, 9.666f);
 Assert.That(vector3, Is.EqualTo(expected).Using(new Vector3EqualityComparer(0.001f)));
}

[Test]
public void FloatReturnsCorrectValue()
{
 var valueOutputterUnderTest = new ValueOutputter();

 var actualFloat = valueOutputterUnderTest.GetFloat();

 Assert.That(actualFloat, Is.EqualTo(19.333f).Using(new FloatEqualityComparer(0.001f)));
}

[Test]
public void QuaternionReturnsCorrectValue()
{
 var valueOutputterUnderTest = new ValueOutputter();

 var actualValue = valueOutputterUnderTest.GetQuaternion();

 var expectedValue = new Quaternion(10f, 0f, 7.33333f, 0f);
 Assert.That(actualValue, Is.EqualTo(expectedValue).Using(new QuaternionEqualityComparer(0.001f)));
}
```

## Additional resources

* [Asserting and comparing](../asserting-and-comparing.html "../asserting-and-comparing.html")

3. Semantic test assertion

5. Asserting and expecting logs

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/LostCrypt/scene-validation-test.html

* [Programming in Unity](../../../scripting.html "../../../scripting.html")
* [Testing your code](../../../test-framework/test-framework-introduction.html "../../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../../test-framework/course/overview.html "../../../test-framework/course/overview.html")
* [Testing Lost Crypt](../../../test-framework/course/LostCrypt/lost-crypt-introduction.html "../../../test-framework/course/LostCrypt/lost-crypt-introduction.html")
* 7. Scene Validation Test

6. Asset Change Test

8. Performance Tests

# 7. Scene Validation Test

## Learning Objectives

Test scene for presence of Sara and Wand game object. Utilize Test Framework feature to make this test use all scenes as fixtures.

## Exercise

1. Create **ValidationTest.cs** file with a single namespace and two classes *SceneValidationTests* and *GameplayScenesProvider*.
2. In the Tests class create **SaraAndWandArePresent** test to check that “Sara Variant” and “Wand” game objects are not null.
3. In the Fixture class `GameplayScenesProvider` implement `IEnumerable<string>` and in generator method yield all scenes from [EditorBuildSettings.scenes](https://docs.unity3d.com/ScriptReference/EditorBuildSettings-scenes.html "https://docs.unity3d.com/ScriptReference/EditorBuildSettings-scenes.html").
4. Use `TestFixture` and [TestFixtureSource](https://docs.nunit.org/articles/nunit/writing-tests/attributes/testfixturesource.html "https://docs.nunit.org/articles/nunit/writing-tests/attributes/testfixturesource.html") annotations on *SceneValidationTests* class.
5. Create a new Empty Scene and attach it to `EditorBuildSettings` to verify if tests are created dynamically.

## Hints

* `TestFixture` and `TestFixtureSource` NUnit annotations require Test Class to be present inside Namespace.
* To attach a scene to `EditorBuildSettings`, you need to create a new Scene, and then add it to **File > Build Settings**.

## Solution

`ValidationTests.cs`

```
using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using UnityEditor;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.TestTools;

namespace ValidationTests
{
    [TestFixture]
    [TestFixtureSource(typeof(GameplayScenesProvider))]
    public class SceneValidationTests
    {
        private readonly string _scenePath;
    
        public SceneValidationTests(string scenePath)
        {
            _scenePath = scenePath;
        }
        
        [OneTimeSetUp]
        public void LoadScene()
        {
            SceneManager.LoadScene(_scenePath);
        }
        
        [UnityTest]
        public IEnumerator SaraAndWandArePresent()
        {
            yield return waitForSceneLoad();
            var wand = GameObject.Find("Wand");
            var sara = GameObject.Find("Sara Variant");
            
            Assert.NotNull(wand, "Wand object exists");
            Assert.NotNull(sara, "Sara object exists");
        }
        
        IEnumerator waitForSceneLoad()
        {
            while (!SceneManager.GetActiveScene().isLoaded)
            {
                yield return null;
            }
        }
    }
    
    public class GameplayScenesProvider : IEnumerable
    {
        public IEnumerator GetEnumerator()
        {
            foreach (var scene in EditorBuildSettings.scenes)
            {
                if (!scene.enabled || scene.path == null)
                {
                    continue;
                }
    
                yield return scene.path;
            }
        }
    
        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
```

6. Asset Change Test

8. Performance Tests

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/LostCrypt/setting-up.html

* [Programming in Unity](../../../scripting.html "../../../scripting.html")
* [Testing your code](../../../test-framework/test-framework-introduction.html "../../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../../test-framework/course/overview.html "../../../test-framework/course/overview.html")
* [Testing Lost Crypt](../../../test-framework/course/LostCrypt/lost-crypt-introduction.html "../../../test-framework/course/LostCrypt/lost-crypt-introduction.html")
* 1. Setting up LostCrypt

Testing Lost Crypt

2. Running a test in a LostCrypt

# 1. Setting up LostCrypt

## Learning Objectives

In this exercise you’ll set up a simple Unity 2D project and import a sample project (LostCrypt).

## Prerequisites

1. **Unity 2020.3 LTS** - recommended version of Unity for this training session
2. **C# IDE** (for example [Rider](https://www.jetbrains.com/rider/download/ "https://www.jetbrains.com/rider/download/") or [Visual Studio](https://visualstudio.microsoft.com "https://visualstudio.microsoft.com")) - not necessary but highly recommended. This way you can use features like a debugger and reliable syntax autocompletion.

## Exercise

1. Open **Unity Hub** and click *New Project*. Select a blank 2D (or Core2D) project.
2. Enter a **Project Name** and click **Create**.
3. Visit the [LostCrypt](https://assetstore.unity.com/packages/essentials/tutorial-projects/lost-crypt-2d-sample-project-158673 "https://assetstore.unity.com/packages/essentials/tutorial-projects/lost-crypt-2d-sample-project-158673") asset page. Click *Add to my Assets* -> *Open in Unity Editor*.
4. **Package Manager** window opens automatically. Find **Lost Crypt - 2D Sample Project**. Press *Download* and then *Import*.
5. **Import Unity Package** window opens. Click *Import* to add all additional packages and assets to your newly created project.
6. Restart Unity if needed.

Now confirm that LostCrypt works correctly.

1. From the **Project** tab open `Scenes/Main`.
2. Enter Play Mode by clicking Play button.
3. You should be able to move your character around.

## Further reading and Resources

You can read more about LostCrypt in [our blog post](https://www.google.com/url?q=https://blog.unity.com/technology/download-our-new-2d-sample-project-lost-crypt&source=gmail-html&ust=1653726008832000&usg=AOvVaw2RORHgX1nn7hE7KZW3e_lA "https://www.google.com/url?q=https://blog.unity.com/technology/download-our-new-2d-sample-project-lost-crypt&source=gmail-html&ust=1653726008832000&usg=AOvVaw2RORHgX1nn7hE7KZW3e_lA").

## Hints (what can go wrong)

* There might be some dependency problems - please make sure LostCrypt is downloaded for the suggested Unity LTS version.
* Make sure you have the newest project packages in your Package Manager.

Testing Lost Crypt

2. Running a test in a LostCrypt

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/LostCrypt/asset-change-test.html

* [Programming in Unity](../../../scripting.html "../../../scripting.html")
* [Testing your code](../../../test-framework/test-framework-introduction.html "../../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../../test-framework/course/overview.html "../../../test-framework/course/overview.html")
* [Testing Lost Crypt](../../../test-framework/course/LostCrypt/lost-crypt-introduction.html "../../../test-framework/course/LostCrypt/lost-crypt-introduction.html")
* 6. Asset Change Test

5. Collision Test

7. Scene Validation Test

# 6. Asset Change Test

## Learning Objectives

This exercise will teach you a popular pattern in Game Tests to verify if Assets change over time.

## Exercise

As you noticed inside LostCrypt, when you pick up the Wand, your character equips armor.  
Write a test that checks that after Sara picks up the wand, armor is equipped.

1. Create a `WandTests.cs` class and implement `MainScene\_CharacterReachesWandAndEquipsArmor` test.
2. Try to observe how `Sara Variant` or more specifically `puppet_sara` GameObject changes the moment you pick up the wand.

## Hints

* You can reuse code from [Reach Wand Test](reach-wand-test.html "reach-wand-test.html") for the logic of the character picking up the wand. Or you can try to trigger this action programmatically.
* Remember that if some Unity internal APIs are not accessible for your test you might need to add a new reference inside the `PlayModeTests` assembly definition.

## Solution

`PlayModeTests.asmdef`

```
{
    "name": "PlayModeTests",
    "rootNamespace": "",
    "references": [
        "Unity.InputSystem",
        "Unity.InputSystem.TestFramework",
        "TestInputControl",
        "UnityEngine.TestRunner",
        "Unity.2D.Animation.Runtime"
    ],
    "includePlatforms": [],
    "excludePlatforms": [],
    "allowUnsafeCode": false,
    "overrideReferences": true,
    "precompiledReferences": [
        "nunit.framework.dll"
    ],
    "autoReferenced": false,
    "defineConstraints": [
        "UNITY_INCLUDE_TESTS"
    ],
    "versionDefines": [],
    "noEngineReferences": false
}
```

`WandTests.cs`

```
using System.Collections;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.TestTools;
using UnityEngine.SceneManagement;
using UnityEngine.Experimental.U2D.Animation;

public class WandTests
{
    private Transform _characterTransform;
    private float _testTimeout = 25.0f;
    private float _wandLocation = 21.080f;

    [UnityTest]
    public IEnumerator MainScene_CharacterReachesWandAndEquipsArmor()
    {
        SceneManager.LoadScene("Assets/Scenes/Main.unity", LoadSceneMode.Single);
        
        // Skip first frame so Sara have a chance to appear on the screen
        yield return null;
        var puppet = GameObject.Find("puppet_sara");
        var spriteLibrary = puppet.GetComponent<SpriteLibrary>();
        
        Assert.AreEqual(spriteLibrary.spriteLibraryAsset.name, "Sara");

        var elapsedTime = 0.0f;
        yield return GoRight();
        while (GetCurrentCharacterPosition() <= _wandLocation)
        {
            yield return null;
            elapsedTime += Time.deltaTime;
            if (elapsedTime > _testTimeout)
            {
                Assert.Fail($"Character did not reach location position in {_testTimeout} seconds.");
            }
        }

        // Wait for Wand pickup animation to be over.
        yield return new WaitForSeconds(12);

        Assert.AreEqual(spriteLibrary.spriteLibraryAsset.name, "Sara_var01");
    }

    private float GetCurrentCharacterPosition()
    {
        // Get Main character's Transform which is used to manipulate position.
        if (_characterTransform == null)
        {
            _characterTransform = GameObject.Find("Sara Variant").transform;
        }

        return _characterTransform.position.x;
    }

    private IEnumerator GoRight()
    {
        TestInputControl.MoveLeft = false;
        yield return null;
        TestInputControl.MoveRight = true;
    } 
}
```

5. Collision Test

7. Scene Validation Test

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/LostCrypt/first-test.html

* [Programming in Unity](../../../scripting.html "../../../scripting.html")
* [Testing your code](../../../test-framework/test-framework-introduction.html "../../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../../test-framework/course/overview.html "../../../test-framework/course/overview.html")
* [Testing Lost Crypt](../../../test-framework/course/LostCrypt/lost-crypt-introduction.html "../../../test-framework/course/LostCrypt/lost-crypt-introduction.html")
* 2. Running a test in a LostCrypt

1. Setting up LostCrypt

3. Moving character

# 2. Running a test in a LostCrypt

## Learning Objectives

Set up a simple Play Mode test for LostCrypt.

## Exercise

1. Go to the `Assets/Scripts` directory, and spend some time exploring the scripts necessary for LostCrypt to work properly.
2. Create a new directory `Assets/Tests`.
3. In the Test Runner window click **Create PlayModeTest Assembly Folder** and name a new folder `PlayModeTests`. You should end up with `Assets/Tests/PlayModeTests`.
4. Open the newly created folder and click **Create Test Script in current folder** in the Test Runner window.
5. Name the file `SceneSetupTests.cs`.
6. Write your first test that asserts that after loading the Main scene the current time is day.

## Hints

* In order to load scenes, please refer to [UnityEngine.SceneManagement](https://docs.unity3d.com/ScriptReference/SceneManagement.SceneManager.html "https://docs.unity3d.com/ScriptReference/SceneManagement.SceneManager.html") documentation.
* Inside `Scenes/Main.unity` [look for GameObject](https://docs.unity3d.com/ScriptReference/GameObject.Find.html "https://docs.unity3d.com/ScriptReference/GameObject.Find.html") **FX - Day**.

## Solution

`SceneSetupTests.cs`

```
using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.TestTools;
using UnityEngine.SceneManagement;

public class SceneSetupTests
{
    [UnityTest]
    public IEnumerator MainScene_LoadsCorrectlyAndItsDaytime()
    {
        SceneManager.LoadScene("Assets/Scenes/Main.unity", LoadSceneMode.Single);
        yield return null;

        var fxDay = GameObject.Find("FX - Day");

        Assert.IsTrue(fxDay != null, "should find the 'FX - Day' object in the scene");
    }
}
```

1. Setting up LostCrypt

3. Moving character

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/LostCrypt/performance-tests.html

* [Programming in Unity](../../../scripting.html "../../../scripting.html")
* [Testing your code](../../../test-framework/test-framework-introduction.html "../../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../../test-framework/course/overview.html "../../../test-framework/course/overview.html")
* [Testing Lost Crypt](../../../test-framework/course/LostCrypt/lost-crypt-introduction.html "../../../test-framework/course/LostCrypt/lost-crypt-introduction.html")
* 8. Performance Tests

7. Scene Validation Test

Debugging and diagnostics

# 8. Performance Tests

## Learning Objectives

One final thing we’ll explore is a package that extends Unity Test Framework with Performance Tests.

## Exercise

The Performance Testing package can be used to measure performance in our game. This is a great tool if we want to track various regressions/progressions that happen over time in our project. In this example, you’ll learn how to create a test that measures game average frames.

1. LostCrypt does not include the Performance Testing package installed by default. Install it by following [these instructions](https://docs.unity3d.com/Packages/com.unity.test-framework.performance@2.8/manual/index.html "https://docs.unity3d.com/Packages/com.unity.test-framework.performance@2.8/manual/index.html").
2. Add the package as a dependency to the [project manifest](https://docs.unity3d.com/Manual/upm-manifestPrj.html "https://docs.unity3d.com/Manual/upm-manifestPrj.html")Each Unity project has a *project manifest*, which acts as an entry point for the Package Manager. This file must be available in the `<project>/Packages` directory. The Package Manager uses it to configure many things, including a list of dependencies for that project, as well as any package repository to query for packages. [More info](../../../upm-manifestPrj.html "../../../upm-manifestPrj.html")  
   See in [Glossary](../../../Glossary.html#projectmanifest "../../../Glossary.html#projectmanifest").
3. When the package is installed, add a reference to `Unity.PerformanceTesting` in your **PlayModeTests** assembly definition to access the performance testing APIs.
4. Create a new C# class under **Assets/Tests/PlayModeTests** called **PerformanceTests.cs**.

You’re now ready to complete your objective. In `PerformanceTests.cs` create a new function called `MainScene_MeasureAverageFrames()`. In this function move your character to the wand position and wait until the wand pickup effect is over. During all that time, measure the frames.

## Bonus

* Try to measure the average FPS in LostCrypt. You might need to use `Time.deltaTime` from UnityEngine API and `Measure.Custom` from the Performance Testing package API.

## Hints

* The first handful of frames after loading Scene are usually unstable, let’s utilize the `Measure.Frames().Scope()` API to measure them into a separate scope.
* After your test finishes, performance results can be viewed under **Window > General > Performance Test Report** or you can even hook into results using [Callback API](https://docs.unity3d.com/Packages/com.unity.test-framework@1.1/manual/extension-get-test-results.html "https://docs.unity3d.com/Packages/com.unity.test-framework@1.1/manual/extension-get-test-results.html").

## Solution

`PerformanceTests.cs`

```
using System.Collections;
using Unity.PerformanceTesting;
using UnityEngine;
using UnityEngine.TestTools;
using UnityEngine.SceneManagement;

public class PerformanceTests
{
    private Transform _characterTransform;
    private float _wandLocation = 21.080f;
        
    [UnityTest, Performance]
    public IEnumerator MainScene_MeasureAverageFrames()
    {
        SceneManager.LoadScene("Assets/Scenes/Main.unity", LoadSceneMode.Single);
        using (Measure.Frames().Scope("Frames.MainSceneOnLoad.Unstable"))
        {
            for (var i = 0; i < 25; i++)
            {
                yield return null;
            }
        }

        using (Measure.Frames().Scope("Frames.MainSceneGameplay"))
        {
            yield return GoRight();
            while (GetCurrentCharacterPosition() <= _wandLocation)
            {
                yield return null;
            }

            StopMoving();
            yield return new WaitForSeconds(15);
        }
    }

    private float GetCurrentCharacterPosition()
    {
        // Get Main character's Transform which is used to manipulate position.
        if (_characterTransform == null)
        {
            _characterTransform = GameObject.Find("Sara Variant").transform;
        }

        return _characterTransform.position.x;
    }

    private IEnumerator GoRight()
    {
        TestInputControl.MoveLeft = false;
        yield return null;
        TestInputControl.MoveRight = true;
    }

    private void StopMoving()
    {
        TestInputControl.MoveRight = false;
        TestInputControl.MoveLeft = false;
    }
}
```

Bonus Solution

`Measure.Custom("FPS", (int)(1f / Time.deltaTime));`

7. Scene Validation Test

Debugging and diagnostics

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/LostCrypt/collision-test.html

* [Programming in Unity](../../../scripting.html "../../../scripting.html")
* [Testing your code](../../../test-framework/test-framework-introduction.html "../../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../../test-framework/course/overview.html "../../../test-framework/course/overview.html")
* [Testing Lost Crypt](../../../test-framework/course/LostCrypt/lost-crypt-introduction.html "../../../test-framework/course/LostCrypt/lost-crypt-introduction.html")
* 5. Collision Test

4. Reach Wand Test

6. Asset Change Test

# 5. Collision Test

## Learning Objectives

Check for collisions and make sure that LostCrypt does not have bugs that allow your character to move outside of the map.

## Exercise

Take a look at a game object `Environment/Character Bounds - Left`. You can see that it is placed at the left side of our 2D map. It is meant to protect players from exiting the map and falling into textures. Let’s see if it fulfills its purpose.

1. Add a new test `MainScene\_CharacterDoesNotFallIntoTextures` in `MovementTest.cs`.
2. Make your character move left and occasionally jump with some wait interval in between jumps.
3. In test, Assert that *Sara Variant* game object position is within bounds of our current scene.

## Hints

* Similarly to the previous test, let’s set some arbitrary amount of seconds as our timeout. Sara should stay within the bounds of the scene for the given time.
* You might want to use `WaitForSeconds(0.5f)` between jumps to emulate User behaviour better.
* Study the Scene and hardcode X, and Y position used for out of map check, or better - get it dynamically from `Character Bounds - Left` game object.

## Solution

`MovementTest.cs`

```
using System.Collections;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.TestTools;
using UnityEngine.SceneManagement;

public class MovementTest
{
    const float _testTimeout = 20.0f;
    private Transform _characterTransform;

    [UnityTest]
    public IEnumerator MainScene_CharacterDoesNotFallIntoTextures()
    {
        SceneManager.LoadScene("Assets/Scenes/Main.unity", LoadSceneMode.Single);
        yield return waitForSceneLoad();

        yield return GoLeft();
        while (Time.timeSinceLevelLoad < _testTimeout)
        {
            yield return new WaitForSeconds(0.5f);
            yield return Jump();
            if (GetCurrentCharacterPosition().x < -75f && GetCurrentCharacterPosition().y < -10f)
            {
                Assert.Fail("Character escaped the map and fell into textures! :(");
            }
        }
    }

    private Vector3 GetCurrentCharacterPosition()
    {
        // Get Main character's Transform which is used to manipulate position.
        if (_characterTransform == null)
        {
            _characterTransform = GameObject.Find("Sara Variant").transform;
        }

        return _characterTransform.position;
    }

    private IEnumerator Jump()
    {
        TestInputControl.Jump = true;
        yield return null;
        TestInputControl.Jump = false;
    }

    private IEnumerator GoLeft()
    {
        TestInputControl.MoveRight = false;
        yield return null;
        TestInputControl.MoveLeft = true;
    }

    private IEnumerator waitForSceneLoad()
    {
        while (SceneManager.GetActiveScene().buildIndex > 0)
        {
            yield return null;
        }
    }
}
```

Our test fails, we have a bug in one of our Sample Unity projects. How would you approach fixing this problem? There are plenty of possibilities, go ahead and try to fix it as part of this training:

* Introduce new Character Bounds Box collider that will prevent the bug from happening.
* Rework our Sara character collision logic.

4. Reach Wand Test

6. Asset Change Test

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/LostCrypt/reach-wand-test.html

* [Programming in Unity](../../../scripting.html "../../../scripting.html")
* [Testing your code](../../../test-framework/test-framework-introduction.html "../../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../../test-framework/course/overview.html "../../../test-framework/course/overview.html")
* [Testing Lost Crypt](../../../test-framework/course/LostCrypt/lost-crypt-introduction.html "../../../test-framework/course/LostCrypt/lost-crypt-introduction.html")
* 4. Reach Wand Test

3. Moving character

5. Collision Test

# 4. Reach Wand Test

## Learning Objectives

Perform Assertions on your character position and behavior.

## Exercise

1. Go back to the previous `MovementTest.cs` file.
2. Write a `MainScene\_CharacterReachesWand` test that makes your character move right, and checks if it reaches the wand location.

## Hints

* Look for *Altar* and *Sara Variant* game objects in your scene. You are interested in measuring the X position of your Transform objects.
* Wand location X position is equal float of **21.080**. Main Character X position is dynamic and it changes whenever it moves.
* Consider setting a timeout that makes the test fail if the Wand is not reached.

## Solution

```
using System.Collections;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.TestTools;
using UnityEngine.SceneManagement;

public class MovementTest
{
    private Transform _characterTransform;
    private float _testTimeout = 25.0f;
    private float _wandLocation = 21.080f;

    [UnityTest]
    public IEnumerator MainScene_CharacterReachesWand()
    {
      SceneManager.LoadScene("Assets/Scenes/Main.unity", LoadSceneMode.Single);
      yield return waitForSceneLoad();

      var elapsedTime = 0.0f;
      yield return GoRight();
      while (GetCurrentCharacterPosition() <= _wandLocation)
      {
          yield return null;
          elapsedTime += Time.deltaTime;
          if (elapsedTime > _testTimeout)
          {
            Assert.Fail($"Character did not reach location position in {_testTimeout} seconds.");
          }
      }
    }

    private float GetCurrentCharacterPosition()
    {
      // Get Main character's Transform which is used to manipulate position.
      if (_characterTransform == null)
      {
          _characterTransform = GameObject.Find("Sara Variant").transform;
      }

      return _characterTransform.position.x;
    }

    private IEnumerator GoRight()
    {
      TestInputControl.MoveLeft = false;
      yield return null;
      TestInputControl.MoveRight = true;
    }

    private IEnumerator waitForSceneLoad()
    {
        while (SceneManager.GetActiveScene().buildIndex > 0)
        {
            yield return null;
        }
    }
}
```

3. Moving character

5. Collision Test

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/LostCrypt/lost-crypt-introduction.html

* [Programming in Unity](../../../scripting.html "../../../scripting.html")
* [Testing your code](../../../test-framework/test-framework-introduction.html "../../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../../test-framework/course/overview.html "../../../test-framework/course/overview.html")
* Testing Lost Crypt

17. Running tests programmatically

1. Setting up LostCrypt

# Testing Lost Crypt

Welcome to the this training material for the Unity Test Framework (UTF).

The training is structured with a selection of exercises, starting with more basic topics and then expanding on that knowledge.

Each section has a Learning Objectives section, which can help you pick what exercises will teach you new things. The exercises are grouped thematically and their difficulty varies.

**This course focus on testing an actual game. Our candidate is the [LostCrypt](https://assetstore.unity.com/packages/essentials/tutorial-projects/lost-crypt-2d-sample-project-158673 "https://assetstore.unity.com/packages/essentials/tutorial-projects/lost-crypt-2d-sample-project-158673") example project.**

## Course outline

| **Topic** | **Description** |
| --- | --- |
| **[Setting up](setting-up.html "setting-up.html")** | Set up a simple Unity 2D project and import a sample project (LostCrypt). |
| **[Running a test in LostCrypt](first-test.html "first-test.html")** | Set up a simple Play mode test for LostCrypt. |
| **[Moving character](moving-character.html "moving-character.html")** | Use the Unity InputSystem package to have a generic way of moving your character programmatically in tests. |
| **[Reach wand test](reach-wand-test.html "reach-wand-test.html")** | Perform assertions on your character position and behavior. |
| **[Collision test](collision-test.html "collision-test.html")** | Check for collisions and make sure that LostCrypt does not have bugs that allow your character to move outside the map. |
| **[Asset change test](asset-change-test.html "asset-change-test.html")** | Use a common pattern in game testing to verify if assets change over time. |
| **[Scene validation test](scene-validation-test.html "scene-validation-test.html")** | Test the scene for the presence of specific game objects and make this test use all scenes as fixtures. |
| **[Performance tests](performance-tests.html "performance-tests.html")** | Extend Unity Test Framework with performance tests. |

## Additional resources

[General Introduction course](../welcome "../welcome")

17. Running tests programmatically

1. Setting up LostCrypt

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/test-framework/course/LostCrypt/moving-character.html

* [Programming in Unity](../../../scripting.html "../../../scripting.html")
* [Testing your code](../../../test-framework/test-framework-introduction.html "../../../test-framework/test-framework-introduction.html")
* [Unity Test Framework learning materials](../../../test-framework/course/overview.html "../../../test-framework/course/overview.html")
* [Testing Lost Crypt](../../../test-framework/course/LostCrypt/lost-crypt-introduction.html "../../../test-framework/course/LostCrypt/lost-crypt-introduction.html")
* 3. Moving character

2. Running a test in a LostCrypt

4. Reach Wand Test

# 3. Moving character

## Learning objectives

How to use the Unity InputSystem package to have a generic way of moving your character programmatically in tests.

## Exercise

Please make sure [InputSystem](https://docs.unity3d.com/Packages/com.unity.inputsystem@latest "https://docs.unity3d.com/Packages/com.unity.inputsystem@latest") is installed in your Unity project. You can verify that by checking the Package Manager.

1. Create a new class called `MovementTest.cs` under `Assets/Tests/PlayModeTests`.
2. Attach the reference to `Unity.InputSystem` and `Unity.InputSystem.TestFramework` in your `PlayModeTests` assembly definition.
3. Create a new `InputControl` directory under Tests: `Assets/Tests/InputControl`.
4. Inside `InputControl` directory, create a new assembly definition: `TestInputControl.asmdef`.
5. Create a new class `TestInputControl.cs` where you implement following properties:
   `public static bool MoveLeft { get; set; }
   public static bool MoveRight { get; set; }
   public static bool Jump { get; set; }`
6. Go back to your assembly definition `PlayModeTests` and attach the reference to newly created: `TestInputControl`.
7. Finally, we need to use our `TestInputControl` in actual LostCrypt code. Currently Unity’s `InputSystem` does not support an easier way of programmatically doing mocks, please see this git diff to know what to change inside `CharacterController2D`:

```
diff --git a/Assets/Scripts/CharacterController2D.cs b/Assets/Scripts/CharacterController2D.cs
index f8a10cf2..e0a62878 100644
--- a/Assets/Scripts/CharacterController2D.cs
+++ b/Assets/Scripts/CharacterController2D.cs
@@ -81,15 +81,15 @@ public class CharacterController2D : MonoBehaviour
         // Horizontal movement
         float moveHorizontal = 0.0f;
 
-        if (keyboard.leftArrowKey.isPressed || keyboard.aKey.isPressed)
+        if (keyboard.leftArrowKey.isPressed || keyboard.aKey.isPressed || TestInputControl.MoveLeft)
             moveHorizontal = -1.0f;
-        else if (keyboard.rightArrowKey.isPressed || keyboard.dKey.isPressed)
+        else if (keyboard.rightArrowKey.isPressed || keyboard.dKey.isPressed || TestInputControl.MoveRight)
             moveHorizontal = 1.0f;
 
         movementInput = new Vector2(moveHorizontal, 0);
 
         // Jumping input
-        if (!isJumping && keyboard.spaceKey.wasPressedThisFrame)
+        if (!isJumping && (keyboard.spaceKey.wasPressedThisFrame || TestInputControl.Jump))
             jumpInput = true;
     }
```

Now you are ready! Go back to `MovementTest.cs` and write a test that does not do any assertions (just yet), but only moves the Sara character and makes it occasionally jump.

## Hints

* You might want to use `WaitForSeconds` in your test, to deliberately make it run longer and see actual animation happening on your screen.
* In case of compilation issues, please make sure you follow the right folder structure:

```
Tests
    InputControl
        TestInputControl.asmdef
        TestInputControl.cs
    PlayModeTests
        MovementTest.cs
        PlayModeTest.asmdef
```

## Solution

`PlayModeTests.asmdef`

```
{
    "name": "PlayModeTests",
    "references": [
      "Unity.InputSystem",
      "Unity.InputSystem.TestFramework",
      "TestInputControl"
    ],
    "optionalUnityReferences": [
      "TestAssemblies"
    ]
}
```

`MovementTest.cs`

```
using System.Collections;
using UnityEngine;
using UnityEngine.TestTools;
using UnityEngine.SceneManagement;

public class MovementTest
{
    [UnityTest]
    public IEnumerator MainScene_CharacterIsAbleToJump()
    {
      SceneManager.LoadScene("Assets/Scenes/Main.unity", LoadSceneMode.Single);
      yield return waitForSceneLoad();
      yield return GoRight();
      yield return new WaitForSeconds(2);
      yield return Jump();
      yield return new WaitForSeconds(3);
      yield return GoLeft();
      yield return Jump();
      yield return new WaitForSeconds(2);
    }

    private IEnumerator Jump()
    {
      TestInputControl.Jump = true;
      yield return null;
      TestInputControl.Jump = false;
    }

    private IEnumerator GoRight()
    {
      TestInputControl.MoveLeft = false;
      yield return null;
      TestInputControl.MoveRight = true;
    }

    private IEnumerator GoLeft()
    {
      TestInputControl.MoveRight = false;
      yield return null;
      TestInputControl.MoveLeft = true;
    }

    private IEnumerator waitForSceneLoad()
    {
        while (SceneManager.GetActiveScene().buildIndex > 0)
        {
            yield return null;
        }
    }
}
```

2. Running a test in a LostCrypt

4. Reach Wand Test

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/2d-physics.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* 2D physics

Tile Palette tab reference for the Preferences window

Rigidbody 2D

# 2D physics

Unity’s physics system lets you handle 2D physics to make use of optimizations available with 2D.

**Note:** You can also use the separate Physics Core 2D API to use 2D physics. The API doesn’t interact with or affect built-in Unity 2D physics components such as RigidBody 2D and Collider 2D. For more information, refer to [Introduction to the Physics Core 2D API](../2d-physics-api/2d-physics-api-introduction.html "../2d-physics-api/2d-physics-api-introduction.html").

You can use the following physics 2D components with Unity:

| **Page** | **Description** |
| --- | --- |
| [Rigidbody 2D](rigidbody/rigidbody-2d-landing.html "rigidbody/rigidbody-2d-landing.html") | Learn how Rigidbody 2D works. |
| [Collider 2D](collider/collider-2d-landing.html "collider/collider-2d-landing.html") | Understand the types of Collider 2D components available to use with Rigidbody 2D. |
| [Effectors 2D](effectors/effectors-2d-landing.html "effectors/effectors-2d-landing.html") | Approaches and techniques to working with the forces of physics when GameObject colliders are in contact. |
| [2D joints](joints/2d-joints-landing.html "joints/2d-joints-landing.html") | Understand the types of 2D Joints available to use with 2D GameObjects. |
| [Physics 2D Profiler](physics-profiler/physics-2d-profiler-landing.html "physics-profiler/physics-2d-profiler-landing.html") | Approaches to analyzing the performance of 2D physics in your application. |
| [Constant Force 2D reference](constant-force-2d-reference.html "constant-force-2d-reference.html") | Explore the properties that control constant forces applied to a Rigidbody 2D. |
| [Physics Material 2D reference](physics-material-2d-reference.html "physics-material-2d-reference.html") | Explore the properties that control the friction and bounce between colliding 2D physics objects. |

## Additional resources

* [Physics 2D reference](../class-Physics2DSettings.html "../class-Physics2DSettings.html")
* [Physics](../PhysicsSection.html "../PhysicsSection.html")

Tile Palette tab reference for the Preferences window

Rigidbody 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/constant-force-2d-reference.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html")
* Constant Force 2D reference

Use the Physics 2D Profiler Legacy mode

Physics Material 2D reference

# Constant Force 2D reference

**Constant Force 2D** is a quick utility for adding constant forces to a **Rigidbody 2D**. This works well for one-shot objects like rockets, if you want them to accelerate over time rather than starting with a large velocity.

Constant Force 2D applies both linear and torque (angular) forces continuously to the Rigidbody 2D, each time the physics engine updates at runtime.

## Properties

| **Property** | **Function** |
| --- | --- |
| **Force** | The linear force applied to the Rigidbody 2D at each physics update. |
| **Relative Force** | The linear force, relative to the Rigidbody 2D coordinate system, applied each physics update. |
| **Torque** | The torque applied to the Rigidbody 2D at each physics update. |

ConstantForce2D

Use the Physics 2D Profiler Legacy mode

Physics Material 2D reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/physics-material-2d-reference.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html")
* Physics Material 2D reference

Constant Force 2D reference

2D physics with the Physics Core 2D API

# Physics Material 2D reference

Use a **Physics Material 2D** to adjust the friction and bounce that occur between 2D physics objects when they collide.

For more information on game physics, refer to [3D Physics](../PhysicsSection.html "../PhysicsSection.html").

## Use a Physics Material 2D

To create a Physics Material 2D, go to **Assets** > **Create** > **2D** > **Physics Material 2D**.

To use your Physics Material 2D, assign it to the **Material** property of a [Collider 2D](collider/collider-2d-landing.html "collider/collider-2d-landing.html") or [Rigidbody 2D](rigidbody/rigidbody-2d-landing.html "rigidbody/rigidbody-2d-landing.html") component.

**Note:** The equivalent asset in 3D physics is referred to as a **Physics Material**.

## Properties

A Physics Material 2D contains the following properties.

| **Property** | **Description** |
| --- | --- |
| **Friction** | Sets the coefficient of friction for this collider. The range is between 0 and 1. A value of 0 means no friction, like ice. A value of 1 means very high friction, like rubber. |
| **Bounciness** | Sets the degree to which collisions rebound from the surface. A value of 0 indicates no bounce while a value of 1 indicates a perfect bounce with no loss of energy. |
| **Friction Combine** | Defines how to combine both material friction values when two colliders interact. The options are:  * **Average**: Uses the average of the two values. * **Mean** (Default): Uses the mean of the two values. * **Multiply**: Multiplies the two values together. * **Minimum**: Uses the smaller value. * **Maximum**: Uses the larger value. |
| **Bounce Combine** | Defines how to combine both material bounciness values when two colliders interact. The options are:  * **Average**: Uses the average of the two values. * **Mean**: Uses the mean of the two values. * **Multiply**: Multiplies the two values together. * **Minimum**: Uses the smaller value. * **Maximum** (Default): Uses the larger value. |

PhysicsMaterial2D

Constant Force 2D reference

2D physics with the Physics Core 2D API

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/physics-profiler/physics-2d-profiler-landing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* Physics 2D Profiler

Wheel Joint 2D

Physics 2D Profiler module reference

# Physics 2D Profiler

Approaches to analyzing the performance of 2D physics in your application.

| **Page** | **Description** |
| --- | --- |
| [Physics 2D Profiler module reference](physics-2d-profiler-module-reference.html "physics-2d-profiler-module-reference.html") | Use the Physics 2D Profiler module to analyze the performance of 2D physics in your application. |
| [Use the Physics 2D Profiler Legacy mode](use-physics-profiler-legacy-mode.html "use-physics-profiler-legacy-mode.html") | Set the Physics Profiler module to Legacy mode to work with data from old versions of the Unity Editor. |

## Additional resources

* [Profiler window reference](../../ProfilerWindow.html "../../ProfilerWindow.html")
* [Profiler introduction](../../profiler-introduction.html "../../profiler-introduction.html")

Wheel Joint 2D

Physics 2D Profiler module reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/physics-profiler/physics-2d-profiler-module-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [Physics 2D Profiler](../../2d-physics/physics-profiler/physics-2d-profiler-landing.html "../../2d-physics/physics-profiler/physics-2d-profiler-landing.html")
* Physics 2D Profiler module reference

Physics 2D Profiler

Use the Physics 2D Profiler Legacy mode

# Physics 2D Profiler module reference

The Physics 2D Profiler module displays information about the physics that the physics system has processed in your project’s scene. This information can help you diagnose and resolve performance issues or unexpected discrepancies related to the physics in your project’s scene.

![Profiler window with the Physics 2D module selected.](../../../uploads/Main/profiler-physics-2d-module.png)


Profiler window with the Physics 2D module selected.

To open the Profiler window, go to menu: **Window** > **Analysis** > **Profiler**. For more information on how to use the Profiler window, refer to [Getting started with the Profiler window](../../ProfilerWindow.html "../../ProfilerWindow.html").

## Chart categories

The Physics 2D Profiler module’s chart is divided into the following categories:

| **Chart** | **Description** |
| --- | --- |
| **Total Contacts** | The total number of contacts that were present in this frame. This includes both collision and trigger contacts. |
| **Total Shapes** | The total number of [physics shapes](../../../ScriptReference/PhysicsShape2D.html "../../../ScriptReference/PhysicsShape2D.html") that were present in this frame. Different [Collider2D](../../../ScriptReference/Collider2D.html "../../../ScriptReference/Collider2D.html") produce different amounts of physics shapes ranging from one to unlimited. You can get the [shape count](../../../ScriptReference/Collider2D-shapeCount.html "../../../ScriptReference/Collider2D-shapeCount.html") and [retrieve the physics shapes](../../../ScriptReference/Collider2D.GetShapes.html "../../../ScriptReference/Collider2D.GetShapes.html") to determine this for any Collider2D. |
| **Total Queries** | The total number of queries that were called this frame. This includes queries such as [Physics2D.Raycast](../../../ScriptReference/Physics2D.Raycast.html "../../../ScriptReference/Physics2D.Raycast.html"), [Physics2D.OverlapPoint](../../../ScriptReference/Physics2D.OverlapPoint.html "../../../ScriptReference/Physics2D.OverlapPoint.html") etc. |
| **Total Callbacks** | The total number of [OnCollisionEnter2D](../../../ScriptReference/Collider2D.OnCollisionEnter2D.html "../../../ScriptReference/Collider2D.OnCollisionEnter2D.html"), [OnCollisionStay2D](../../../ScriptReference/Collider2D.OnCollisionStay2D.html "../../../ScriptReference/Collider2D.OnCollisionStay2D.html"), [OnCollisionExit2D](../../../ScriptReference/Collider2D.OnCollisionExit2D.html "../../../ScriptReference/Collider2D.OnCollisionExit2D.html"), [OnTriggerEnter2D](../../../ScriptReference/Collider2D.OnTriggerEnter2D.html "../../../ScriptReference/Collider2D.OnTriggerEnter2D.html"), [OnTriggerStay2D](../../../ScriptReference/Collider2D.OnTriggerStay2D.html "../../../ScriptReference/Collider2D.OnTriggerStay2D.html") and [OnTriggerExit2D](../../../ScriptReference/Collider2D.OnTriggerExit2D.html "../../../ScriptReference/Collider2D.OnTriggerExit2D.html") callbacks that were called in this frame. |
| **Total Joints** | The total number of any [Joint2D](../../../ScriptReference/Joint2D.html "../../../ScriptReference/Joint2D.html") that were present in this frame. |
| **Total Bodies** | The total number of [Rigidbody2D](../../../ScriptReference/Rigidbody2D.html "../../../ScriptReference/Rigidbody2D.html") that were present in this frame. |
| **Awake Bodies** | The total number of Rigidbody2D that were both [awake](../../../ScriptReference/Rigidbody2D.IsAwake.html "../../../ScriptReference/Rigidbody2D.IsAwake.html") (not [sleeping](../../../ScriptReference/Rigidbody2D.IsSleeping.html "../../../ScriptReference/Rigidbody2D.IsSleeping.html")) and were present in this frame. |
| **Dynamic Bodies** | The total number of Rigidbody2D with a [Dynamic](../../../ScriptReference/RigidbodyType2D.Dynamic.html "../../../ScriptReference/RigidbodyType2D.Dynamic.html") body type that were present in this frame. |
| **Continuous Bodies** | The total number of Rigidbody2D with a [Continuous](../../../ScriptReference/CollisionDetectionMode2D.Continuous.html "../../../ScriptReference/CollisionDetectionMode2D.Continuous.html") collision detection mode that were present in this frame. |
| **Physics Used Memory** | The total amount of persistent memory used exclusively by the 2D physics system. This includes both the core engine and the memory used by each physics component, but doesn’t include the temporary memory used in this frame. |

Click on the frame chart window or select a captured frame in the chart graph to track selected categories. To change the order of the categories in the chart, drag them in the chart’s legend. You can also click a category’s colored legend to toggle its display. Refer to the [module details pane](#module-details-pane "#module-details-pane") for more information about the selected statistics.

## Module details pane

When you select a frame in the Physics 2D Profiler module, the details pane displays detailed information about the physics in your project’s scene. The details pane is sorted by category, where each category exists on a single line.

The following reference table describes the statistics available, plus its corresponding [profiler counter](../../profiler-counters-reference.html "../../profiler-counters-reference.html")Placed in code with the ProfilerCounter API to track metrics, such as the number of enemies spawned in your game. [More info](../../https://docs.unity3d.com/Packages/com.unity.profiling.core@latest/index.html?subfolder=/manual/profilercounter-guide.html "../../https://docs.unity3d.com/Packages/com.unity.profiling.core@latest/index.html?subfolder=/manual/profilercounter-guide.html")  
See in [Glossary](../../Glossary.html#profilercounter "../../Glossary.html#profilercounter"), and availability in release builds. The profiler counters are always available in the Editor and in development builds. This information is also available via the [ProfilerRecorder API](../../../ScriptReference/Unity.Profiling.ProfilerRecorder.html "../../../ScriptReference/Unity.Profiling.ProfilerRecorder.html") and in the [Profiler Module Editor](../../profiler-module-editor.html "../../profiler-module-editor.html") so you can add them to a custom Profiler module.

### Physics Used Memory

| **Statistic** | **Description** | **Corresponding Profiler Counter (exact name)** | **Available in Release Players?** |
| --- | --- | --- | --- |
| **Total** | The total amount of persistent memory used exclusively by the 2D physics system. This includes both the core engine and the memory used by each physics component, but doesn’t include temporary memory used in this frame. | Physics Used Memory 2D | No |
| **Relative** | The relative percentage of memory used by the 2D physics system compared to the overall memory usage of Unity. | N/A | N/A |

### Bodies

| **Statistic** | **Description** | **Corresponding Profiler Counter (exact name)** | **Available in Release Players?** |
| --- | --- | --- | --- |
| **Total** | The total number of [Rigidbody2D](../../../ScriptReference/Rigidbody2D.html "../../../ScriptReference/Rigidbody2D.html") that were present in this frame. | Total Bodies | No |
| **Awake** | The number of Rigidbody2D that were both [awake](../../../ScriptReference/Rigidbody2D.IsAwake.html "../../../ScriptReference/Rigidbody2D.IsAwake.html") (not [sleeping](../../../ScriptReference/Rigidbody2D.IsSleeping.html "../../../ScriptReference/Rigidbody2D.IsSleeping.html")) and were present in this frame. Note that a Rigidbody2D with a [Static](../../../ScriptReference/RigidbodyType2D.Static.html "../../../ScriptReference/RigidbodyType2D.Static.html") body type is always asleep. | Awake Bodies | No |
| **Asleep** | The number of Rigidbody2D that were both sleeping (not awake) and were present in this frame. Note that a Rigidbody2D with a Static body type is always asleep. | Asleep Bodies | No |
| **Dynamic** | The number of Rigidbody2D with a [Dynamic](../../../ScriptReference/RigidbodyType2D.Dynamic.html "../../../ScriptReference/RigidbodyType2D.Dynamic.html") body type that were present in this frame. Dynamic bodies take the most processing of all body types. | Dynamic Bodies | No |
| **Kinematic** | The number of Rigidbody2D with a [Kinematic](../../../ScriptReference/RigidbodyType2D.Kinematic.html "../../../ScriptReference/RigidbodyType2D.Kinematic.html") body type that were present in this frame. Kinematic bodies have minimal processing. | Kinematic Bodies | No |
| **Static** | The number of Rigidbody2D with a [Static](../../../ScriptReference/RigidbodyType2D.Static.html "../../../ScriptReference/RigidbodyType2D.Static.html") body type that were present in this frame. Static bodies take the least processing of all body types. | Static Bodies | No |
| **Discrete** | The number of Rigidbody2D with a [Discrete](../../../ScriptReference/CollisionDetectionMode2D.Discrete.html "../../../ScriptReference/CollisionDetectionMode2D.Discrete.html") collision detection mode that were present in this frame. Discrete bodies are far less performance-intensive than when using [Continuous](../../../ScriptReference/CollisionDetectionMode2D.Continuous.html "../../../ScriptReference/CollisionDetectionMode2D.Continuous.html") collision detection mode. | Discrete Bodies | No |
| **Continuous** | The number of Rigidbody2D with a [Continuous](../../../ScriptReference/CollisionDetectionMode2D.Continuous.html "../../../ScriptReference/CollisionDetectionMode2D.Continuous.html") collision detection mode that were present in this frame. Continuous bodies are much more performance-intensive than when using Discrete collision detection mode.. | Continuous Bodies | No |

### Shapes

| **Statistic** | **Description** | **Corresponding Profiler Counter (exact name)** | **Available in Release Players?** |
| --- | --- | --- | --- |
| **Total** | The total number of [physics shapes](../../../ScriptReference/PhysicsShape2D.html "../../../ScriptReference/PhysicsShape2D.html") that were present in this frame. Different [Collider2D](../../../ScriptReference/Collider2D.html "../../../ScriptReference/Collider2D.html") produce different amounts of physics shapes ranging from one to unlimited. You can get the [shape count](../../../ScriptReference/Collider2D-shapeCount.html "../../../ScriptReference/Collider2D-shapeCount.html") and [retrieve the physics shapes](../../../ScriptReference/Collider2D.GetShapes.html "../../../ScriptReference/Collider2D.GetShapes.html") to determine this for any Collider2D. | Total Shapes | No |
| **Awake** | A physics shape is awake if it is attached to a [Rigidbody2D](../../../ScriptReference/Rigidbody2D.html "../../../ScriptReference/Rigidbody2D.html") that is [awake](../../../ScriptReference/Rigidbody2D.IsAwake.html "../../../ScriptReference/Rigidbody2D.IsAwake.html"). This is the number of physics shapes that were both awake (not [sleeping](../../../ScriptReference/Rigidbody2D.IsSleeping.html "../../../ScriptReference/Rigidbody2D.IsSleeping.html")) and were present in this frame. | Awake Shapes | No |
| **Asleep** | A physics shape is asleep if it is attached to a Rigidbody2D that is asleep. This is the number of physics shapes that were both sleeping (not awake) and were present in this frame. | Asleep Shapes | No |
| **Dynamic** | A physics shape is [Dynamic](../../../ScriptReference/RigidbodyType2D.Dynamic.html "../../../ScriptReference/RigidbodyType2D.Dynamic.html") if it is attached to a Rigidbody2D with a Dynamic body type. This is the number of physics shapes that were both Dynamic and were present in this frame. | Dynamic Shapes | No |
| **Kinematic** | A physics shape is Kinematic if it is attached to a Rigidbody2D with a [Kinematic](../../../ScriptReference/RigidbodyType2D.Kinematic.html "../../../ScriptReference/RigidbodyType2D.Kinematic.html") body type. This is the number of physics shapes that were both Kinematic and were present in this frame. | Kinematic Shapes | No |
| **Static** | A physics shape is Static if it is attached to a Rigidbody2D with a [Static](../../../ScriptReference/RigidbodyType2D.Static.html "../../../ScriptReference/RigidbodyType2D.Static.html") body type. This is the number of physics shapes that were both Static and were present in this frame. | Static Shapes | No |

### Queries

| **Statistic** | **Description** | **Corresponding Profiler Counter (exact name)** | **Available in Release Players?** |
| --- | --- | --- | --- |
| **Total** | The total number of queries that were called this frame. This includes queries such as [`Physics2D.Raycast`](../../../ScriptReference/Physics2D.Raycast.html "../../../ScriptReference/Physics2D.Raycast.html"), and [`Physics2D.OverlapPoint`](../../../ScriptReference/Physics2D.OverlapPoint.html "../../../ScriptReference/Physics2D.OverlapPoint.html"). | Total Queries | No |
| **Raycast** | The number of ray or line based queries that were called this frame. This includes queries such as `Physics2D.Raycast` and [`Physics2D.Linecast`](../../../ScriptReference/Physics2D.Linecast.html "../../../ScriptReference/Physics2D.Linecast.html"). | Raycast Queries | No |
| **Shapecast** | The number of shape swept queries that were called this frame. This includes queries such as [`Physics2D.BoxCast`](../../../ScriptReference/Physics2D.BoxCast.html "../../../ScriptReference/Physics2D.BoxCast.html"), [`Physics2D.CircleCast`](../../../ScriptReference/Physics2D.CircleCast.html "../../../ScriptReference/Physics2D.CircleCast.html"), and [`Collider2D.Cast`](../../../ScriptReference/Collider2D.Cast.html "../../../ScriptReference/Collider2D.Cast.html"). | Shapecast Queries | No |
| **Overlap** | The number of overlap queries that were called this frame. This includes queries such as [`Physics2D.OverlapPoint`](../../../ScriptReference/Physics2D.OverlapPoint.html "../../../ScriptReference/Physics2D.OverlapPoint.html"), [`Physics2D.OverlapCircle`](../../../ScriptReference/Physics2D.OverlapCircle.html "../../../ScriptReference/Physics2D.OverlapCircle.html"), and [`Collider2D.OverlapCollider`](../../../ScriptReference/Collider2D.OverlapCollider.html "../../../ScriptReference/Collider2D.OverlapCollider.html"). | Overlap Queries | No |
| **IsTouching** | The number of contact touching queries that were called this frame. This includes queries such as [`Physics2D.IsTouching`](../../../ScriptReference/Physics2D.IsTouching.html "../../../ScriptReference/Physics2D.IsTouching.html"), [`Collider2D.IsTouching`](../../../ScriptReference/Collider2D.IsTouching.html "../../../ScriptReference/Collider2D.IsTouching.html"), [`Rigidbody2D.IsTouching`](../../../ScriptReference/Rigidbody2D.IsTouchingLayers.html "../../../ScriptReference/Rigidbody2D.IsTouchingLayers.html") etc. | IsTouching Queries | No |
| **GetContacts** | The number of contact retrieval queries that were called this frame. This includes queries such as [`Physics2D.GetContacts`](../../../ScriptReference/Physics2D.GetContacts.html "../../../ScriptReference/Physics2D.GetContacts.html"), [`Collider2D.GetContacts`](../../../ScriptReference/Collider2D.GetContacts.html "../../../ScriptReference/Collider2D.GetContacts.html"), and [Rigidbody2D.GetContacts](../../../ScriptReference/Rigidbody2D.GetContacts.html "../../../ScriptReference/Rigidbody2D.GetContacts.html"). Note that this doesn’t include [`Collision2D.GetContacts`](../../../ScriptReference/Collision2D-contacts.html "../../../ScriptReference/Collision2D-contacts.html") which isn’t a physics query. | GetContacts Queries | No |
| **Particle** | The number of queries that the Particle System called this frame. This is used when the Particle System module is configured to contact 2D physics colliders and is entirely controlled by the Particle System. Note that this can have a high impact on performance, but is also very efficient to process. | Particle Queries | No |

### Contacts

| **Statistic** | **Description** | **Corresponding Profiler Counter (exact name)** | **Available in Release Players?** |
| --- | --- | --- | --- |
| **Total** | The total number of contacts that were present in this frame. This includes both Collision and Trigger contacts. Processing and solving contacts can take a long time to process. | Total Contacts | No |
| **Added** | The number of contacts that were added in this frame. This includes both Collision and Trigger contacts. Adding too many contacts in a single frame can cause performance spikes. | Added Contacts | No |
| **Removed** | The number of contacts that were removed in this frame. This includes both Collision and Trigger contacts. Removing contacts is fast and has minimum impact on performance. | Removed Contacts | No |
| **Broadphase Updates** | The number of broadphase updates that were processed in this frame. A broadphase update occurs when physics shapes are added, removed or change in size. Broadphase updates are used to detect contact changes when two physics shapes potentially overlap and can result in a broadphase pair being created. | Broadphase Updates | No |
| **Broadphase Pairs** | The number of broadphase pairs that were processed in this frame. A broadphase pair is created when a broadphase update results in a potential overlap of two physics shapes. A broadphase pair is then processed and the result will be a new contact or it will be ignored if the physics shapes are not configured to contact each other. | Broadphase Pairs | No |

### Callbacks

| **Statistic** | **Description** | **Corresponding Profiler Counter (exact name)** | **Available in Release Players?** |
| --- | --- | --- | --- |
| **Total** | The total number of [OnCollisionEnter2D](../../../ScriptReference/Collider2D.OnCollisionEnter2D.html "../../../ScriptReference/Collider2D.OnCollisionEnter2D.html"), [OnCollisionStay2D](../../../ScriptReference/Collider2D.OnCollisionStay2D.html "../../../ScriptReference/Collider2D.OnCollisionStay2D.html"), [OnCollisionExit2D](../../../ScriptReference/Collider2D.OnCollisionExit2D.html "../../../ScriptReference/Collider2D.OnCollisionExit2D.html"), [OnTriggerEnter2D](../../../ScriptReference/Collider2D.OnTriggerEnter2D.html "../../../ScriptReference/Collider2D.OnTriggerEnter2D.html"), [OnTriggerStay2D](../../../ScriptReference/Collider2D.OnTriggerStay2D.html "../../../ScriptReference/Collider2D.OnTriggerStay2D.html") and [OnTriggerExit2D](../../../ScriptReference/Collider2D.OnTriggerExit2D.html "../../../ScriptReference/Collider2D.OnTriggerExit2D.html") callbacks that were called in this frame. | Total Callbacks | No |
| **Collision Enter** | The number of OnCollisionEnter2D callbacks that were called in this frame. | Collision Enter | No |
| **Collision Stay** | The number of OnCollisionStay2D callbacks that were called in this frame. | Collision Stay | No |
| **Collision Exit** | The number of OnCollisionExit2D callbacks that were called in this frame. | Collision Exit | No |
| **Trigger Enter** | The number of OnTriggerEnter2D callbacks that were called in this frame. | Trigger Enter | No |
| **Trigger Stay** | The number of OnTriggerStay2D callbacks that were called in this frame. | Trigger Stay | No |
| **Trigger Exit** | The number of OnTriggerExit2D callbacks that were called in this frame. | Trigger Exit | No |

### Solver

| **Statistic** | **Description** | **Corresponding Profiler Counter (exact name)** | **Available in Release Players?** |
| --- | --- | --- | --- |
| **World Count** | The total number of [physics scene](../../../ScriptReference/PhysicsScene2D.html "../../../ScriptReference/PhysicsScene2D.html") that were present in this frame. Each physics scene contains a physics world that can be simulated independently of any other physics world. Having a lot of worlds isn’t a performance issue because it only occupies memory and doesn’t perform any work unless it is simulated. | Solver World Count | No |
| **Simulation Count** | The number of times all physics scene were simulated either by Unity automatically, by calling [Physics2D.Simulate](../../../ScriptReference/Physics2D.Simulate.html "../../../ScriptReference/Physics2D.Simulate.html") or by directly calling [PhysicsScene2D.Simulate](../../../ScriptReference/PhysicsScene2D.Simulate.html "../../../ScriptReference/PhysicsScene2D.Simulate.html"). | Solver Simulation Count | No |
| **Discrete Islands** | An island is a connected graph of bodies connected via mutual joints or mutual contacts. Note that [Static](../../../ScriptReference/RigidbodyType2D.Static.html "../../../ScriptReference/RigidbodyType2D.Static.html") body types don’t connect islands. The number of contact islands solved when handling the discrete solving step. | Solver Discrete Islands | No |
| **Continuous Islands** | An island is a connected graph of bodies connected via mutual joints or mutual contacts. Note that Static body types don’t connect islands. This is the number of islands solved when handling the continuous solving step. Solving continuous islands is a performance-intensive process and involves multiple iterations that require islands to be regenerated and reprocessed. Only a [Rigidbody2D](../../../ScriptReference/Rigidbody2D.html "../../../ScriptReference/Rigidbody2D.html") with a [Continuous](../../../ScriptReference/CollisionDetectionMode2D.Continuous.html "../../../ScriptReference/CollisionDetectionMode2D.Continuous.html") collision detection mode will result in this additional continuous island being formed and processed. | Solver Continuous Islands | No |

### Transform Sync

| **Statistic** | **Description** | **Corresponding Profiler Counter (exact name)** | **Available in Release Players?** |
| --- | --- | --- | --- |
| **Sync Calls** | The total number of Transform sync calls that were called in this frame. A Transform sync (known as a Transform Read) involves checking if any Transforms have changed and if so, the Transform poses are read and cause any [Rigidbody2D](../../../ScriptReference/Rigidbody2D.html "../../../ScriptReference/Rigidbody2D.html") or [Collider2D](../../../ScriptReference/Collider2D.html "../../../ScriptReference/Collider2D.html") to be updated. Transforms should not be changed when using physics components however sometimes this is necessary but should be avoided due to potential performance issues if performing too many. Any movements should be performed by using the Rigidbody2D API.  The physics system will perform a single Transform sync as the first part of performing a simulation step so this will always be at least one if a simulation occurred (see [Simulation Count](#SimCount "#SimCount") above). The physics system will also perform a single Transform sync per-frame if it is handling any Rigidbody2D interpolation.  Additional calls are shown if either [Physics2D.AutoSyncTransforms](../../../ScriptReference/Physics2D-autoSyncTransforms.html "../../../ScriptReference/Physics2D-autoSyncTransforms.html") is active (inactive by default) or if [Physics2D.SyncTransforms](../../../ScriptReference/Physics2D.SyncTransforms.html "../../../ScriptReference/Physics2D.SyncTransforms.html") is called although both of these should be avoided as they can both have a severe impact on performance. | Total Transform Sync Calls | No |
| **Sync Bodies** | The number of Rigidbody2D that were affected by a Transform sync. This should be kept to a minimum, preferably zero. | Transform Sync Bodies | No |
| **Sync Colliders** | The number of Collider2D that were affected by a Transform sync. This should be kept to a minimum, preferably zero. | Transform Sync Colliders | No |
| **Parent Sync Bodies** | The number of Rigidbody2D that were affected by a Transform sync caused by reparenting a Transform.. This should be kept to a minimum, preferably zero. | Transform Parent Sync Bodies | No |
| **Parent Sync Colliders** | The number of Collider2D that were affected by a Transform sync caused by reparenting a Transform. This should be kept to a minimum, preferably zero. | Transform Parent Sync Colliders | No |

### Joints

| **Statistic** | **Description** | **Corresponding Profiler Counter (exact name)** | **Available in Release Players?** |
| --- | --- | --- | --- |
| **Total** | The total number of any [Joint2D](../../../ScriptReference/Joint2D.html "../../../ScriptReference/Joint2D.html") that were present in this frame. Solving joints can become expensive so these should be kept to a minimum. | Total Joints | No |

### Timings

**Note**: All timings are summed over all physics worlds (see [World Count](#WorldCount "#WorldCount")). The number of times any timing was sampled is shown in square brackets after the timing itself. Effectively the timing can be divided by the **World Count** value to give an average time.

| **Statistic** | **Description** | **Corresponding Profiler Counter (exact name)** | **Available in Release Players?** |
| --- | --- | --- | --- |
| **Sim** | The total amount of time spent handling a full simulation step. This can be called by Unity automatically, by calling [Physics2D.Simulate](../../../ScriptReference/Physics2D.Simulate.html "../../../ScriptReference/Physics2D.Simulate.html") or by directly calling [PhysicsScene2D.Simulate](../../../ScriptReference/PhysicsScene2D.Simulate.html "../../../ScriptReference/PhysicsScene2D.Simulate.html"). This time includes all the stages involved in completing a simulation step including Transform Sync (read), Calculating Contacts, Integration, Solving Contacts and Joints, Transform Write and Contact Callbacks. | N/A | N/A |
| **Sync** | The total amount of time spent processing Transform Sync (see [Sync Calls](#SyncCalls "#SyncCalls")). | N/A | N/A |
| **Step** | The total amount of time spent processing simulation steps. This time includes only the core stages involved in completing a simulation step including Calculating Contacts, Integration, Solving Contacts and Joints. | N/A | N/A |
| **Write** | The total amount of time spent processing Transform write. This happens during the end of the simulation step where body poses are read and written back to the Transform system. | N/A | N/A |
| **Callbacks** | The total amount of time spent processing all callbacks (see [Total Callbacks](#TotalCallbacks "#TotalCallbacks")). | N/A | N/A |

## Additional resources

* [Profiler window introduction](../../ProfilerWindow.html "../../ProfilerWindow.html")
* [Profiling your application](../../profiler-profiling-applications.html "../../profiler-profiling-applications.html")

Physics 2D Profiler

Use the Physics 2D Profiler Legacy mode

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/physics-profiler/use-physics-profiler-legacy-mode.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [Physics 2D Profiler](../../2d-physics/physics-profiler/physics-2d-profiler-landing.html "../../2d-physics/physics-profiler/physics-2d-profiler-landing.html")
* Use the Physics 2D Profiler Legacy mode

Physics 2D Profiler module reference

Constant Force 2D reference

# Use the Physics 2D Profiler Legacy mode

You can use to the **Legacy** mode to view data collected from versions of Unity before 2022.2. This mode displays an older version of the Physics 2D Profiler module, which was the default module in versions of Unity before 2022.2. To change mode, select **Legacy** from the dropdown menu at the upper-left of the Profiler module’s details pane.

In this mode, you can load and inspect Profiler data that was saved in an older version of Unity. You can’t use this mode to display data from newer versions of Unity.

![Legacy Profiler view](../../../uploads/Main/physics2d-profiler-legacy.png)


Legacy Profiler view

## Additional resources

* [Physics 2D Profiler module reference](physics-2d-profiler-module-reference.html "physics-2d-profiler-module-reference.html")
* [Getting started with the Profiler window](../../ProfilerWindow.html "../../ProfilerWindow.html")

Physics 2D Profiler module reference

Constant Force 2D reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/wheel-joint-2d-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* [Wheel Joint 2D](../../2d-physics/joints/wheel-joint-2d-landing.html "../../2d-physics/joints/wheel-joint-2d-landing.html")
* Wheel Joint 2D

Wheel Joint 2D fundamentals

Physics 2D Profiler

# Wheel Joint 2D

Use the **Wheel Joint 2D** to simulate a rolling wheel, on which an object can move. You can apply motor power to the joint. The wheel uses a suspension spring to maintain its distance from the main body of the vehicle.

## Properties

| **Property** | **Function** |
| --- | --- |
| **Enable Collision** | Enable this property to enable collisions between the two connected GameObjects. |
| **Connected Rigid Body** | Specify the other GameObject this joint connects to. If you leave this as **None**, the other end of the joint is fixed to a point in space defined by the **Connected Anchor** setting. Select the circle icon to the right to view a list of GameObjects to connect to. |
| **Auto Configure Connected Anchor** | Enable this property to automatically set the anchor location for the other GameObject this Hinge Joint 2D connects to. You do not need to enter coordinates for the **Connected Anchor** property if you enable this property. |
| **Anchor** | Define where (in terms of x, y-coordinates on the **Rigidbody 2D**) the end point of the joint connects to this GameObject. |
| **Connected Anchor** | Define where (in terms of x, y-coordinates on the **Rigidbody 2D**) the end point of the joint connects to the other GameObject. |
| **Suspension** | Select this to expand this property’s settings. |
| **Damping Ratio** | Set the degree to suppress spring oscillation. In the range 0 to 1, the higher the value, the less movement. |
| **Frequency** | Set the frequency at which the spring oscillates while the GameObjects are approaching the separation distance you want (measured in cycles per second). In the range 0 to 1,000,000 - the higher the value, the stiffer the spring. **Note:** Setting **Frequency** to zero will create the stiffest spring type joint possible. |
| **Angle** | Set the world movement angle for the suspension. |
| **Use Motor** | Enable this to apply motor force to the joint. |
| **Motor** | Select this to expand this property’s settings. |
| **Motor Speed** | Target speed (degrees per second) for the motor to reach. |
| **Maximum Motor Force** | Set the maximum torque (or rotation) the motor can apply when attempting to reach the target speed. |
| **Break Action** | Set the action taken when either the force or torque threshold is exceeded. |
| **Break Force** | Set the force threshold which if exceeded, will cause the joint to perform the selected **Break Action**. The default value is set to **Infinity**, which can never be exceeded and therefore the **Break Action** can never be taken while the threshold remains at this value. |
| **Break Torque** | Set the torque threshold which if exceeded, will cause the joint to perform the selected **Break Action**. The default value is set to **Infinity**, which can never be exceeded and therefore the **Break Action** can never be taken while the threshold remains at this value. |

Wheel Joint 2D fundamentals

Physics 2D Profiler

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/fixed-joint-2d-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* [Fixed Joint 2D](../../2d-physics/joints/fixed-joint-2d-landing.html "../../2d-physics/joints/fixed-joint-2d-landing.html")
* Fixed Joint 2D component reference

Fixed Joint 2D fundamentals

Friction Joint 2D

# Fixed Joint 2D component reference

Use the **Fixed Joint 2D** to connect two GameObjects controlled by Rigidbody 2D physics to keep them in a position relative to each other, so the GameObjects are always offset at a given position and angle. It is a spring-type 2D joint for which you don’t need to set maximum forces. You can set the spring to be rigid or soft.

Refer to [Fixed Joint 2D and Relative Joint 2D](fixed-joint-2d-fundamentals.html#fixed-relative "fixed-joint-2d-fundamentals.html#fixed-relative") for the differences between **Fixed Joint 2D** and **Relative Joint 2D**.

## Properties

| **Property** | **Function** |
| --- | --- |
| **Enable Collision** | Enable this property to enable collisions between the two connected GameObjects. |
| **Connected Rigid Body** | Specify the other object this joint connects to. Leave this as **None** to have the other end of the joint fixed at a point in space defined by the **Connected Anchor** property. Select the circle icon to the right to view a list of GameObjects to connect to. |
| **Auto Configure Connected Anchor** | Enable this property to automatically set the anchor location for the other object this joint connects to. You do not need to enter coordinates for the **Connected Anchor** property if you enable this property. |
| **Anchor** | Define where (in terms of x, y-coordinates on the **Rigidbody 2D**) the end point of the joint connects to this GameObject. |
| **Connected Anchor** | Define where (in terms of x, y-coordinates on the **Rigidbody 2D**) the end point of the joint connects to the other GameObject. |
| **Damping Ratio** | Set the degree to suppress spring oscillation. In the range 0 to 1, the higher the value, the less movement. |
| **Frequency** | Set the frequency at which the spring oscillates while the GameObjects are approaching the separation distance you want (measured in cycles per second). In the range 0 to 1,000,000 - the higher the value, the stiffer the spring. **Note:** Setting **Frequency** to zero will create the stiffest spring type joint possible. |
| **Break Action** | Set the action taken when either the force or torque threshold is exceeded. |
| **Break Force** | Set the force threshold which if exceeded, will cause the joint to perform the selected **Break Action**. The default value is set to **Infinity**, which can never be exceeded and therefore the **Break Action** can never be taken while the threshold remains at this value. |
| **Break Torque** | Set the torque threshold which if exceeded, will cause the joint to perform the selected **Break Action**. The default value is set to **Infinity**, which can never be exceeded and therefore the **Break Action** can never be taken while the threshold remains at this value. |

FixedJoint2D

Fixed Joint 2D fundamentals

Friction Joint 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/relative-joint-2d-fundamentals.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* [Relative Joint 2D](../../2d-physics/joints/relative-joint-2d-landing.html "../../2d-physics/joints/relative-joint-2d-landing.html")
* Relative Joint 2D fundamentals

Relative Joint 2D

Relative Joint 2D component reference

# Relative Joint 2D fundamentals

The aim of this joint is to maintain a relative linear and angular distance (offset) between two points. Those two points can be two **Rigidbody2D** components or a **Rigidbody2D** component and a fixed position in the world. **Note:** Connect to a fixed position in the world by setting **Connected Rigidbody** to None.

The joint applies a linear and angular (torque) force to both connected Rigidbody objects. It uses a simulated motor that is preconfigured to be quite powerful: It has a high **Max Force** and **Max Torque** limit. You can lower these values to make the motor less powerful motor or turn-off it off completely.

This joint has two simultaneous constraints:

* Maintain the specified linear offset between the two Rigidbody objects.
* Maintain the starting angular offset between the two Rigidbody objects.

You can use this joint to construct physical objects that need to:

* Keep a distance apart from each other, as if they are unable to move further away from each other or closer together. (You decide the distance they are apart from each other. The distance can change in real-time.)
* Rotate with respect to each other only at particular angle. (You decide the angle.)

Some uses may need the connection to be flexible, such as: A space-shooter game where the player has extra gun batteries that follow them. You can use the Relative Joint to give the trailing gun batteries a slight lag when they follow, but make them rotate with the player with no lag.

Some uses may need a configurable force, such as: A game where the camera follows a player using a configurable force to keep track.

## Comparing Fixed and Relative joints 2D

**FixedJoint2D** is spring type joint. **RelativeJoint2D** is a motor type joint with a maximum force and/or torque.

* The Fixed Joint uses a spring to maintain the relative linear and angular offsets and the Relative joint uses a motor. You can configure a joint’s spring or motor.
* The Fixed joint works with anchor points (it’s derived from script **AnchoredJoint2D**): It maintains the relative linear and angular offset between the anchors. The Relative joint doesn’t have anchor points (it’s derived directly from script **Joint2D**).
* The Relative joint can modify the relative linear and angular offsets in real time: The Fixed joint cannot.

## Additional resources

* [Joints 2D](./2d-joints-landing.html "./2d-joints-landing.html")
* [Relative Joint 2D component reference](relative-joint-2d-reference.html "relative-joint-2d-reference.html")

Relative Joint 2D

Relative Joint 2D component reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/slider-joint-2d-landing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* Slider Joint 2D

Relative Joint 2D component reference

Slider Joint 2D fundamentals

# Slider Joint 2D

Techniques and resources for working with Slider Joint 2D components.

| **Page** | **Description** |
| --- | --- |
| [Slider Joint 2D fundamentals](slider-joint-2d-fundamentals.html "slider-joint-2d-fundamentals.html") | Understand the Slider Joint 2D component and how it’s used to slide a GameObject along a line in space. |
| [Slider Joint 2D component reference](slider-joint-2d-reference.html "slider-joint-2d-reference.html") | Explore the properties of the Slider Joint 2D. |

Relative Joint 2D component reference

Slider Joint 2D fundamentals

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/friction-joint-2d-landing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* Friction Joint 2D

Fixed Joint 2D component reference

Friction Joint 2D fundamentals

# Friction Joint 2D

Techniques and resources for working with Friction Joint 2D components.

| **Page** | **Description** |
| --- | --- |
| [Friction Joint 2D fundamentals](friction-joint-2d-fundamentals.html "friction-joint-2d-fundamentals.html") | Understand the Friction Joint 2D component and how it’s used to reduce both the linear and angular velocities between two GameObjects. |
| [Friction Joint 2D component reference](friction-joint-2d-reference.html "friction-joint-2d-reference.html") | Explore the properties of the Friction Joint 2D. |

Fixed Joint 2D component reference

Friction Joint 2D fundamentals

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/fixed-joint-2d-landing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* Fixed Joint 2D

Distance Joint 2D component reference

Fixed Joint 2D fundamentals

# Fixed Joint 2D

Techniques and resources for working with Fixed Joint 2D components.

| **Page** | **Description** |
| --- | --- |
| [Fixed Joint 2D fundamentals](fixed-joint-2d-fundamentals.html "fixed-joint-2d-fundamentals.html") | Understand the Fixed Joint 2D component and how it’s used to keep two objects in a certain position relative to each other. |
| [Fixed Joint 2D component reference](fixed-joint-2d-reference.html "fixed-joint-2d-reference.html") | Explore the properties of the Fixed Joint 2D. |

Distance Joint 2D component reference

Fixed Joint 2D fundamentals

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/target-joint-2d-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* [Target Joint 2D](../../2d-physics/joints/target-joint-2d-landing.html "../../2d-physics/joints/target-joint-2d-landing.html")
* Target Joint 2D

Target Joint 2D fundamentals

Wheel Joint 2D

# Target Joint 2D

This joint connects to a specified target, rather than another Rigidbody object as other joints do. This behaves in a similar way to a spring type joint.

## Properties

| **Property** | **Function** |
| --- | --- |
| **Anchor** | Define where (in terms of x, y-coordinates on the **Rigidbody 2D**) the end point of the joint connects to this GameObject. |
| **Target** | Define where (in terms of x, y-coordinates in world space) the other end of the joint attempts to move. |
| **Auto Configure Target** | Enable this property to automatically set the other end of the joint to the current position of the GameObject. **Note:** When this option is enabled, the target changes as you move the GameObject but the target will not change if the option is not enabled. |
| **Max Force** | Set the force that the joint can apply when attempting to move the object to the target position. The higher the value, the higher the maximum force. |
| **Damping Ratio** | Set the degree to suppress spring oscillation. In the range 0 to 1, the higher the value, the less movement. |
| **Frequency** | Set the frequency at which the spring oscillates while the GameObjects are approaching the separation distance you want (measured in cycles per second). In the range 0 to 1,000,000 - the higher the value, the stiffer the spring. **Note:** Setting **Frequency** to zero will create the stiffest spring type joint possible. |
| **Break Action** | Set the action taken when either the force or torque threshold is exceeded. |
| **Break Force** | Set the force threshold which if exceeded, will cause the joint to perform the selected **Break Action**. The default value is set to **Infinity**, which can never be exceeded and therefore the **Break Action** can never be taken while the threshold remains at this value. |

Target Joint 2D fundamentals

Wheel Joint 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/introduction-to-2d-joints.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* Introduction to 2D joints

2D joints

2D joint constraints

# Introduction to 2D joints

2D joints are the 2D counterparts of the 3D joint physics components, and are made to work only with 2D GameObjects. You can only attach 2D joints to GameObjects which have an attached Rigidbody 2D component, or to a fixed position in world space. A 2D joint connects a Rigidbody 2D GameObject to another Rigidbody 2D GameObject. 2D joints can apply forces that move Rigidbody GameObjects, and joint limits can restrict that movement.

You can tell a 2D joint from its 3D counterpart in the [Component browser](../../UsingComponents.html "../../UsingComponents.html") by its name ending in ‘2D’.

There are many different types of 2D joints available. Refer to each joint’s respective page for detailed information about their properties and uses. These can be found in the [2D Joints](./2d-joints-landing.html "./2d-joints-landing.html") section.

2D joints

2D joint constraints

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/distance-joint-2d-landing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* Distance Joint 2D

2D joint constraints

Distance Joint 2D fundamentals

# Distance Joint 2D

Techniques and resources for working with Distance Joint 2D components.

| **Page** | **Description** |
| --- | --- |
| [Distance Joint 2D fundamentals](distance-joint-2d-fundamentals.html "distance-joint-2d-fundamentals.html") | Understand the Distance Joint 2D component and how it’s used to keep to GameObjects a set distance apart. |
| [Distance Joint 2D component reference](distance-joint-2d-reference.html "distance-joint-2d-reference.html") | Explore the properties of the Distance Joint 2D. |

2D joint constraints

Distance Joint 2D fundamentals

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/friction-joint-2d-fundamentals.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* [Friction Joint 2D](../../2d-physics/joints/friction-joint-2d-landing.html "../../2d-physics/joints/friction-joint-2d-landing.html")
* Friction Joint 2D fundamentals

Friction Joint 2D

Friction Joint 2D component reference

# Friction Joint 2D fundamentals

Use the Friction Joint 2D to slow down movement between two points to a stop. This joint’s aim is to maintain a zero relative linear and angular offset between two points. Those two points can be two **Rigidbody 2D** components or a **Rigidbody 2D** component and a fixed position in the world. (Connect to a fixed position in the world by setting **Connected Rigidbody** to None).

## Resistance

The joint applies linear force (**Force**) and angle force (**Torque**) to both Rigidbody 2D points. It uses a simulated motor that is pre-configured to have a low motor power (and so, low resistance). You can change the resistance to make it weaker or stronger.

Strong Resistance:

* A high (1,000,000 is the highest) **Max Force** creates strong linear resistance. The Rigidbody 2D GameObjects won’t move in a line relative to each other very much.
* A high (1,000,000 is the highest) **Max Torque** creates strong angular resistance. The Rigidbody 2D GameObjects won’t move at an angle relative to each other very much.

Weak Resistance:

* A low **Max Force** creates weak linear resistance. The Rigidbody 2D GameObjects move easily in a line relative to each other.
* A low **Max Torque** creates weak angular resistance. The Rigidbody 2D GameObjects move easily at an angle relative to each other.

## Constraints

Friction Joint 2D has two simultaneous constraints:

* Maintain a zero relative linear velocity between two anchor points on two Rigidbody 2Ds
* Maintain a zero relative angular velocity between two anchor points on two Rigidbody 2Ds

You can use this joint to construct physical GameObjects that need to behave as if they have friction. They can resist either linear movement or angular movement, or both linear and angular movement. For example:

* A platform that does rotate, but resists applied forces, making it difficult but possible for the player to move it.
* A ball that resists linear movement. The ball’s friction is related to the GameObject’s velocity and not to any collisions. It acts like the **Linear Damping** and **Angular Damping** which is set in **Rigidbody 2D**. The difference is that Friction Joint 2D has the option of maximum **Force** and **Torque** settings.

## Additional resources

* [Joints 2D](./2d-joints-landing.html "./2d-joints-landing.html")
* [Friction Joint 2D component reference](friction-joint-2d-reference.html "friction-joint-2d-reference.html")

Friction Joint 2D

Friction Joint 2D component reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/hinge-joint-2d-landing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* Hinge Joint 2D

Friction Joint 2D component reference

Hinge Joint 2D fundamentals

# Hinge Joint 2D

Techniques and resources for working with Hinge Joint 2D components.

| **Page** | **Description** |
| --- | --- |
| [Hinge Joint 2D fundamentals](hinge-joint-2d-fundamentals.html "hinge-joint-2d-fundamentals.html") | Understand the Hinge Joint 2D component and how it’s used to rotate a GameObject around point in space. |
| [Hinge Joint 2D component reference](hinge-joint-2d-reference.html "hinge-joint-2d-reference.html") | Explore the properties of the Hinge Joint 2D. |

Friction Joint 2D component reference

Hinge Joint 2D fundamentals

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/hinge-joint-2d-fundamentals.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* [Hinge Joint 2D](../../2d-physics/joints/hinge-joint-2d-landing.html "../../2d-physics/joints/hinge-joint-2d-landing.html")
* Hinge Joint 2D fundamentals

Hinge Joint 2D

Hinge Joint 2D component reference

# Hinge Joint 2D fundamentals

The Hinge Joint 2D’s is used to have a joint that allows a GameObject to rotate around a particular point, for example a door hinge, wheels, or pendulums.

You can use this joint to make two points overlap. Those two points can be two **Rigidbody 2D** components, or a **Rigidbody 2D** component and a fixed position in the world space. Connect the Hinge Joint 2D to a fixed position in the world by setting **Connected Rigidbody** to **None**. The joint applies a linear force to both connected Rigidbody 2D GameObjects.

The Hinge Joint 2D has a simulated rotational motor which you can turn on or off. Set the **Maximum Motor Speed** and **Maximum Motor Force** to control the angular speed (**Torque**) and make the two Rigidbody 2D GameObjects rotate in an arc relative to each other. Set the limits of the arc using **Lower Angle** and **Upper Angle**.

## Constraints

Hinge Joint 2D has three simultaneous constraints. All are optional:

* Maintain a relative linear distance between two anchor points on two Rigidbody 2D GameObjects.
* Maintain an angular speed between two anchor points on two Rigidbody 2D GameObjects (limited with a maximum torque in **Maximum Motor Force**).
* Maintain an angle within a specified arc.

You can use this joint to construct physical GameObjects that need to behave as if they are connected with a rotational pivot. For example:

* A see-saw pivot where the horizontal section is connected to the base. Use the joint’s **Angle Limits** to simulate the highest and lowest point of the see-saw’s movement.
* A pair of scissors connected together with a hinge pivot. Use the joint’s **Angle Limits** to simulate the closing and maximum opening of the scissors.
* A simple wheel connected to the body of a car with the pivot connecting the wheel at its center to the car. In this example you can use the Hinge Joint 2D’s motor to rotate the wheel.

## Additional resources

* [Joints 2D](./2d-joints-landing.html "./2d-joints-landing.html")
* [Hinge Joint 2D component reference](hinge-joint-2d-reference.html "hinge-joint-2d-reference.html")

Hinge Joint 2D

Hinge Joint 2D component reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/distance-joint-2d-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* [Distance Joint 2D](../../2d-physics/joints/distance-joint-2d-landing.html "../../2d-physics/joints/distance-joint-2d-landing.html")
* Distance Joint 2D component reference

Distance Joint 2D fundamentals

Fixed Joint 2D

# Distance Joint 2D component reference

The **Distance Joint 2D** is a 2D joint that attaches two GameObjects controlled by **Rigidbody 2D** physics, and keeps them a certain distance apart.

## Properties

| **Property** | **Function** |
| --- | --- |
| **Enable Collision** | Enable this property to enable collisions between the two connected GameObjects. |
| **Connected Rigidbody** | Specify the other object this joint connects to. Leave this as **None** to have the other end of the joint fixed at a point in space defined by the **Connected Anchor** property. Select the circle icon to the right to view a list of GameObjects to connect to. |
| **Auto Configure Connected Anchor** | Enable this property to automatically set the anchor location for the other object this joint connects to. You do not need to enter coordinates for the **Connected Anchor** property if you enable this property. |
| **Anchor** | Define where (in terms of x, y-coordinates on the **Rigidbody 2D**) the end point of the joint connects to this GameObject. |
| **Connected Anchor** | Define where (in terms of x, y-coordinates on the **Rigidbody 2D**) the end point of the joint connects to the other GameObject. |
| **Auto Configure Distance** | Enable this to automatically detect the current distance between the two GameObjects, and set it as the distance that the Distance Joint 2D keeps between the two GameObjects. When enabled, you do not need to specify the distance between the GameObjects at **Distance**. |
| **Distance** | Specify the distance that the Distance Joint 2D keeps between the two GameObjects. |
| **Max Distance Only** | Enable this to only enforce a maximum distance. This allows connected GameObjects to move closer to each other, but not further than the distance set by **Distance**. Clear this to keep the distance between the GameObjects fixed. |
| **Break Action** | Set the action taken when either a force or torque threshold is exceeded. |
| **Break Force** | Set the force threshold which if exceeded, will cause the joint to perform the selected **Break Action**. The default value is set to **Infinity**, which can never be exceeded and therefore the **Break Action** can never be taken while the threshold remains at this value. |

DistanceJoint2D

Distance Joint 2D fundamentals

Fixed Joint 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/spring-joint-2d-landing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* Spring Joint 2D

Slider Joint 2D

Spring Joint 2D fundamentals

# Spring Joint 2D

Techniques and resources for working with Spring Joint 2D components.

| **Page** | **Description** |
| --- | --- |
| [Spring Joint 2D fundamentals](spring-joint-2d-fundamentals.html "spring-joint-2d-fundamentals.html") | Understand the Spring Joint 2D component and how it’s used to allow two GameObjects to react as if they were attached together by a spring. |
| [Spring Joint 2D component reference](spring-joint-2d-reference.html "spring-joint-2d-reference.html") | Explore the properties of the Spring Joint 2D. |

Slider Joint 2D

Spring Joint 2D fundamentals

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/wheel-joint-2d-landing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* Wheel Joint 2D

Target Joint 2D

Wheel Joint 2D fundamentals

# Wheel Joint 2D

Techniques and resources for working with Wheel Joint 2D components.

| **Page** | **Description** |
| --- | --- |
| [Wheel Joint 2D fundamentals](wheel-joint-2d-fundamentals.html "wheel-joint-2d-fundamentals.html") | Understand the Wheel Joint 2D component and how it’s used to simulate the behavior of a rolling wheel. |
| [Wheel Joint 2D component reference](wheel-joint-2d-reference.html "wheel-joint-2d-reference.html") | Explore the properties of the Wheel Joint 2D. |

Target Joint 2D

Wheel Joint 2D fundamentals

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/friction-joint-2d-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* [Friction Joint 2D](../../2d-physics/joints/friction-joint-2d-landing.html "../../2d-physics/joints/friction-joint-2d-landing.html")
* Friction Joint 2D component reference

Friction Joint 2D fundamentals

Hinge Joint 2D

# Friction Joint 2D component reference

The **Friction Joint 2D** connects GameObjects controlled by Rigidbody 2D physics. The Friction Joint 2D reduces both the linear and angular velocities between the objects to zero (ie, it slows them down).

## Properties

| **Property** | **Function** |
| --- | --- |
| **Enable Collision** | Enable this property to enable collisions between the two connected GameObjects. |
| **Connected Rigid Body** | Specify the other object this joint connects to. Leave this as **None** to have the other end of the joint fixed at a point in space defined by the **Connected Anchor** property. Select the circle icon to the right to view a list of GameObjects to connect to. |
| **Auto Configure Connected Anchor** | Enable this property to automatically set the anchor location for the other object this joint connects to. You do not need to enter coordinates for the **Connected Anchor** property if you enable this property. |
| **Anchor** | Define where (in terms of x, y-coordinates on the **Rigidbody 2D**) the end point of the joint connects to this GameObject. |
| **Connected Anchor** | Define where (in terms of x, y-coordinates on the **Rigidbody 2D**) the end point of the joint connects to the other GameObject. |
| **Max Force** | Set the linear (or straight line) movement between joined GameObjects. A high value resists the linear movement between GameObjects. |
| **Max Torque** | Set the angular (or rotation) movement between joined GameObjects. A high value resists the rotation movement between GameObjects. |
| **Break Action** | Set the action taken when either the force or torque threshold is exceeded. |
| **Break Force** | Set the force threshold which if exceeded, will cause the joint to perform the selected **Break Action**. The default value is set to **Infinity**, which can never be exceeded and therefore the **Break Action** can never be taken while the threshold remains at this value. |
| **Break Torque** | Set the torque threshold which if exceeded, will cause the joint to perform the selected **Break Action**. The default value is set to **Infinity**, which can never be exceeded and therefore the **Break Action** can never be taken while the threshold remains at this value. |

FrictionJoint2D

Friction Joint 2D fundamentals

Hinge Joint 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/target-joint-2d-fundamentals.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* [Target Joint 2D](../../2d-physics/joints/target-joint-2d-landing.html "../../2d-physics/joints/target-joint-2d-landing.html")
* Target Joint 2D fundamentals

Target Joint 2D

Target Joint 2D

# Target Joint 2D fundamentals

Use this joint to connect a Rigidbody GameObject to a point in space. The aim of this joint is to keep zero linear distance between two points: An anchor point on a Rigidbody object and a world space position, called the “**Target**”. The joint applies linear force to the Rigidbody object, it does not apply torque (angular force).

The joint uses a simulated spring. You can set the spring’s stiffness and movement by adjusting its settings. For example, to set a stiff and barely moving spring:

* Set a high (1,000,000 is the highest) **Frequency** == a stiff spring.
* Set a high (1 is the highest) **Damping Ratio** == a barely moving spring.

To simulate a looser and more freely moving spring, you would use the following settings:

* Set a low **Frequency** == a loose spring.
* Set a low **Damping Ratio** == a moving spring.

When the spring applies its force between the Rigidbody object and target, it tends to overshoot the distance you have set between them, and then rebound repeatedly, giving in a continuous oscillation. The **Damping Ratio** sets how quickly the Rigidbody object stops moving. The **Frequency** sets how quickly the Rigidbody object oscillates either side of the distance you have specified.

This joint has one constraint:

* Maintain a zero linear distance between the anchor point on a Rigidbody object and a world space position (**Target**).

You can use this joint to construct physical objects that need to move to designated target positions and stay there until another target position is selected or the target is cleared. For example:

* A game where players pick up cakes, using a mouse-click, and drag them into to a plate. You can use this joint to move each cake to the plate.

You could also use the joint to allow objects to hang: If the anchor point is not the center of mass, then the object will rotate. Such as:

* A game where players pick up boxes. If they use a mouse-click to pick a box up by its corner and drag it, it will hang from the cursor.

## Additional resources

* [Joints 2D](./2d-joints-landing.html "./2d-joints-landing.html")
* [Target Joint 2D component reference](target-joint-2d-reference.html "target-joint-2d-reference.html")

TargetJoint2D

Target Joint 2D

Target Joint 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/spring-joint-2d-fundamentals.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* [Spring Joint 2D](../../2d-physics/joints/spring-joint-2d-landing.html "../../2d-physics/joints/spring-joint-2d-landing.html")
* Spring Joint 2D fundamentals

Spring Joint 2D

Spring Joint 2D

# Spring Joint 2D fundamentals

This joint behaves like a spring, while keeping a linear distance between two points. You set this via the **Distance** setting. Those two points can be two **Rigidbody2D** components or a **Rigidbody2D** component and a fixed position in the world. (Connect to a fixed position in the world by setting **Connected Rigidbody** to None). The joint applies a linear force to both rigid bodies. It doesn’t apply torque (an angle force).

The joint uses a simulated spring. You can set the spring’s stiffness and movement:

A stiff, barely moving spring…

* A high (1,000,000 is the highest) **Frequency** == a stiff spring.
* A high (1 is the highest) **Damping Ratio** == a barely moving spring.

A loose, moving spring…

* A low **Frequency** == a loose spring.
* A low **Damping Ratio** == a moving spring.

When the spring applies its force between the objects, it tends to overshoot the distance you have set between them, and then rebound repeatedly, giving in a continuous oscillation. The **Damping Ratio** sets how quickly the objects stop moving. The **Frequency** sets how quickly the objects oscillate either side of the target distance.

This joint has one constraint:

* Maintain a zero linear distance between two anchor points on two Rigidbody objects.

You can use this joint to construct physical objects that need to react as if they are connected together using a spring or a connection which allows rotation. For example:

* A character whose body is composed of multiple objects that act as if they are semi-rigid. Use the Spring Joint to connect the character’s body parts together, allowing them to flex to and from each other. You can specify whether the body parts are held together loosely or tightly.

**Note:** Spring Joint 2D uses a Box 2D spring-joint, which the Distance Joint 2D also uses with its frequency set to zero.

## Additional resources

* [Joints 2D](./2d-joints-landing.html "./2d-joints-landing.html")
* [Spring Joint 2D component reference](spring-joint-2d-reference.html "spring-joint-2d-reference.html")

Spring Joint 2D

Spring Joint 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/slider-joint-2d-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* [Slider Joint 2D](../../2d-physics/joints/slider-joint-2d-landing.html "../../2d-physics/joints/slider-joint-2d-landing.html")
* Slider Joint 2D

Slider Joint 2D fundamentals

Spring Joint 2D

# Slider Joint 2D

This joint allows a GameObject controlled by Rigidbody physics to slide along a line in space. The object can freely move anywhere along the line in response to collisions or forces. Alternatively, it can be also be moved along by a motor force, with limits applied to keep its position within a certain section of the line.

## Properties

| **Property** | **Function** |
| --- | --- |
| **Enable Collision** | Enable this property to enable collisions between the two connected GameObjects. |
| **Connected Rigidbody** | Specify the other object this joint connects to. Leave this as **None** to have the other end of the joint fixed at a point in space defined by the **Connected Anchor** property. Select the circle icon to the right to view a list of GameObjects to connect to. |
| **Auto Configure Connected Anchor** | Enable this property to automatically set the anchor location for the other object this joint connects to. You do not need to enter coordinates for the **Connected Anchor** property if you enable this property. |
| **Anchor** | Define where (in terms of x, y-coordinates on the **Rigidbody 2D**) the end point of the joint connects to this GameObject. |
| **Connected Anchor** | Define where (in terms of x, y-coordinates on the **Rigidbody 2D**) the end point of the joint connects to the other GameObject. |
| **Auto Configure Angle** | Enable this property to automatically detect between the two GameObjects. The joint then keeps the same angle between the two GameObjects. You do not need to manually specify the angle when you enable this property. |
| **Angle** | Enter the angle that the joint keeps between the two objects. |
| **Use Motor** | Use the sliding motor? Check the box for yes. |
| **Motor** | Expand for motor-related property settings. |
| **Motor Speed** | Set the target motor speed (meters/sec). |
| **Maximum Motor Force** | Set the maximum force the motor can apply while attempting to reach the target speed. |
| **Use Limits** | Enable this property to set limits to the linear force. |
| **Translation Limits** | Expand to set the limited distance that the translation can travel. |
| **Lower Translation** | Set the minimum distance the GameObject can be from the connected anchor point. |
| **Upper Translation** | Set the maximum distance the GameObject can be from the connected anchor point. |
| **Break Action** | Set the action taken when either the force or torque threshold is exceeded. |
| **Break Force** | Set the force threshold which if exceeded, will cause the joint to perform the selected **Break Action**. The default value is set to **Infinity**, which can never be exceeded and therefore the **Break Action** can never be taken while the threshold remains at this value. |
| **Break Torque** | Set the torque threshold which if exceeded, will cause the joint to perform the selected **Break Action**. The default value is set to **Infinity**, which can never be exceeded and therefore the **Break Action** can never be taken while the threshold remains at this value. |

Slider Joint 2D fundamentals

Spring Joint 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/hinge-joint-2d-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* [Hinge Joint 2D](../../2d-physics/joints/hinge-joint-2d-landing.html "../../2d-physics/joints/hinge-joint-2d-landing.html")
* Hinge Joint 2D component reference

Hinge Joint 2D fundamentals

Relative Joint 2D

# Hinge Joint 2D component reference

This joint allows a GameObject controlled by Rigidbody 2D physics to be attached to a point in space around which it can rotate. The rotation can be left to happen passively (for example, in response to a collision) or can be actively powered by a motor torque provided by the Joint 2D itself. You can set limits to prevent the hinge from making a full rotation, or make more than a single rotation.

## Properties

| **Property** | **Function** |
| --- | --- |
| **Enable Collision** | Enable this property to enable collisions between the two connected GameObjects. |
| **Connected Rigidbody** | Specify the other GameObject this joint connects to. If you leave this as **None**, the other end of the joint is fixed to a point in space defined by the **Connected Anchor** setting. Select the circle icon to the right to view a list of GameObjects to connect to. |
| **Auto Configure Connected Anchor** | Enable this property to automatically set the anchor location for the other GameObject this Hinge Joint 2D connects to. You do not need to enter coordinates for the **Connected Anchor** property if you enable this property. |
| **Anchor** | Define where (in terms of x, y-coordinates on the **Rigidbody 2D**) the end point of the joint connects to this GameObject. |
| **Connected Anchor** | Define where (in terms of x, y-coordinates on the **Rigidbody 2D**) the end point of the joint connects to the other GameObject. |
| **Use Motor** | Enable this to apply motor force to the joint. |
| **Motor** | Select this to expand this property’s settings. |
| **Motor Speed** | Set the target motor speed (in degrees per second). |
| **Maximum Motor Force** | Set the maximum torque (or rotation) the motor can apply when attempting to reach the target speed. |
| **Use Limits** | Enable this to limit the rotation angle. |
| **Angle Limits** | Select this to expand the Angle limits settings. Set the limits used when **User Limits** is enabled. |
| **Lower Angle** | Set the lower end of the rotation arc allowed by the limit. |
| **Upper Angle** | Set the upper end of the rotation arc allowed by the limit. |
| **Break Action** | Set the action taken when either the force or torque threshold is exceeded. |
| **Break Force** | Set the force threshold which if exceeded, will cause the joint to perform the selected **Break Action**. The default value is set to **Infinity**, which can never be exceeded and therefore the **Break Action** can never be taken while the threshold remains at this value. |
| **Break Torque** | Set the torque threshold which if exceeded, will cause the joint to perform the selected **Break Action**. The default value is set to **Infinity**, which can never be exceeded and therefore the **Break Action** can never be taken while the threshold remains at this value. |

HingeJoint2D

Hinge Joint 2D fundamentals

Relative Joint 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/distance-joint-2d-fundamentals.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* [Distance Joint 2D](../../2d-physics/joints/distance-joint-2d-landing.html "../../2d-physics/joints/distance-joint-2d-landing.html")
* Distance Joint 2D fundamentals

Distance Joint 2D

Distance Joint 2D component reference

# Distance Joint 2D fundamentals

The main application of the Distance Joint 2D component is to keep distance between two points. These two points can be two Rigidbody 2D components or a Rigidbody 2D component and a fixed position in the world.

**Note**: To connect a **Rigidbody 2D** component to a fixed position in the world, set the **Connected Rigidbody** field to **None**.

This Joint 2D does not apply torque or rotation. It does apply a linear force to both connected items, using a very stiff simulated ‘spring’ to maintain the distance. You cannot configure the properties of this ‘spring’.

This Joint 2D has a selectable constraint:

* **Constraint A**: Maintains a fixed distance between two anchor points on two bodies (when **Max Distance Only** is unchecked).
* **Constraint B**: Maintains maximum distance only between two anchor points on two bodies (when **Max Distance Only** is checked).

You can use this Joint 2D to construct physical objects that need to behave as if they are connected with a rigid connection that can rotate.

* Using **Constraint A** (**Max Distance Only** unchecked), you can create a fixed length connection, such as two wheels on a bicycle.
* Using **Constraint B** (**Max Distance Only** checked), you can create a constrained but unfixed length connection, which allows flexible movement such as a yo-yo moving towards and away from a fixed point.

## Additional resources

* [Joints 2D](./2d-joints-landing.html "./2d-joints-landing.html")
* [Distance Joint 2D component reference](distance-joint-2d-reference.html "distance-joint-2d-reference.html")

Distance Joint 2D

Distance Joint 2D component reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/relative-joint-2d-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* [Relative Joint 2D](../../2d-physics/joints/relative-joint-2d-landing.html "../../2d-physics/joints/relative-joint-2d-landing.html")
* Relative Joint 2D component reference

Relative Joint 2D fundamentals

Slider Joint 2D

# Relative Joint 2D component reference

The **Relative Joint 2D** connects two GameObjects controlled by Rigidbody physics to maintain in a position based on each other’s location. Use this joint to keep two objects offset from each other, at a position and angle you decide.

## Properties

| **Property** | **Function** |
| --- | --- |
| **Enable Collision** | Enable this property to enable collisions between the two connected GameObjects. |
| **Connected Rigid Body** | Specify the other object this joint connects to. Leave this as **None** to have the other end of the joint fixed at a point in space defined by the **Connected Anchor** property. Select the circle icon to the right to view a list of GameObjects to connect to. |
| **Max Force** | Set the linear (or straight line) movement between joined GameObjects. A high value (up to 1,000) uses high force to maintain the offset. |
| **Max Torque** | Set the angular (or rotation) movement between joined GameObjects. A high value (up to 1000) uses high force to maintain the offset. |
| **Correction Scale** | Tweak the joint to correct its behavior if required. Increasing the **Max Force** or **Max Torque** may affect the joint’s behavior such that the joint doesn’t reach its target, requiring you to correct it by adjusting this setting. The default setting is 0.3. |
| **Auto Configure Offset** | Enable this property to automatically set and maintain the distance and angle between the connected objects. You do not need to manually enter the **Linear Offset** and **Angular Offset** when you enable this property. |
| **Linear Offset** | Enter local space coordinates to specify and maintain the distance between the connected objects. |
| **Angular Offset** | Enter local space coordinates to specify and maintain the angle between the connected objects. |
| **Break Action** | Set the action taken when either the force or torque threshold is exceeded. |
| **Break Force** | Set the force threshold which if exceeded, will cause the joint to perform the selected **Break Action**. The default value is set to **Infinity**, which can never be exceeded and therefore the **Break Action** can never be taken while the threshold remains at this value. |
| **Break Torque** | Set the torque threshold which if exceeded, will cause the joint to perform the selected **Break Action**. The default value is set to **Infinity**, which can never be exceeded and therefore the **Break Action** can never be taken while the threshold remains at this value. |

RelativeJoint2D

Relative Joint 2D fundamentals

Slider Joint 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/fixed-joint-2d-fundamentals.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* [Fixed Joint 2D](../../2d-physics/joints/fixed-joint-2d-landing.html "../../2d-physics/joints/fixed-joint-2d-landing.html")
* Fixed Joint 2D fundamentals

Fixed Joint 2D

Fixed Joint 2D component reference

# Fixed Joint 2D fundamentals

The aim of this joint is to maintain a relative linear and angular offset between two points. Those two points can be two **Rigidbody 2D** components or a **Rigidbody 2D** component and a fixed position in the world. (Connect to a fixed position in the world by setting **Connected Rigidbody** to None).

The linear and angular offsets are based upon the relative positions and orientations of the two connected points, so you change the offsets by moving the connected GameObjects in your Scene view.

The joint applies both linear and torque forces to connected Rigidbody 2D GameObjects. It uses a simulated spring that is pre-configured to be as stiff as the simulation can provide. You can change the spring’s value to make it weaker using the **Frequency** setting.

When the spring applies its force between the GameObjects, it tends to overshoot the desired distance between them and then rebound repeatedly, resulting in a continuous oscillation. The damping ratio determines how quickly the oscillation reduces and brings the GameObjects to rest. The frequency is the rate at which it oscillates either side of the target distance; the higher the frequency, the stiffer the spring.

Fixed Joint 2D has two simultaneous constraints:

* Maintain the linear offset between two anchor points on two Rigidbody 2D GameObjects.
* Maintain the angular offset between two anchor points on two Rigidbody 2D GameObjects.

You can use this joint to construct physical GameObjects that need to react as if they are rigidly connected. They can’t move away from each other, they can’t move closer together, and they can’t rotate with respect to each other, such as a bridge made of sections which hold rigidly together.

You can also use this joint to create a less rigid connection that flexes - for example, a bridge made of sections which are slightly flexible.

## Comparing Fixed and Relative joints 2D

It is important to know the major differences between Fixed Joint 2D and Relative Joint 2D:

* **Fixed Joint 2D** is a spring-type joint. **Relative Joint 2D** is a motor-type joint with a maximum force and/or torque.
* **Fixed Joint 2D** uses a spring to maintain the relative linear and angular offsets. **Relative Joint 2D** uses a motor. You can configure a joint’s spring or motor.
* **Fixed Joint 2D** works with anchor points (it’s derived from script **Anchored Joint 2D**); it maintains the relative linear and angular offset between the anchors. **Relative Joint 2D** doesn’t have anchor points (it’s derived directly from script **Joint 2D**).
* **Fixed Joint 2D** cannot modify the relative linear and angular offsets in real time. **Relative Joint 2D** can.

## Additional resources

* [Joints 2D](./2d-joints-landing.html "./2d-joints-landing.html")
* [Fixed Joint 2D component reference](fixed-joint-2d-reference.html "fixed-joint-2d-reference.html")

Fixed Joint 2D

Fixed Joint 2D component reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/2d-joint-constraints.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* 2D joint constraints

Introduction to 2D joints

Distance Joint 2D

# 2D joint constraints

A constraint is a rule which a joint will try to ensure isn’t permanently broken. There are different types of constraints, and all joints provide at least one constraint that apply to and govern the Rigidbody 2D behavior. Some constraints limit behavior such as ensuring a Rigidbody stays on a line, or in a certain position. Some are ‘driving’ constraints which actively compel a Rigidbody GameObject to behave in a certain way, such as trying to make a GameObject maintain a certain speed.

## Temporarily breaking constraints

Unity’s physics system expects that constraints can be temporarily broken, such as when the objects move further apart than their set distance constraint or move faster than their set speed constraint. When a constraint isn’t broken, the joint doesn’t apply any forces. When a constraint is broken, the joint applies forces to fix the constraint.

For example, with ‘driving’ constraints, the joint applies forces to maintain the distance or ensure the speed set by the constraint. While this application of force is typically performed quickly, it doesn’t always instantly fix the constraint and instead it fixes the constraint gradually over time. This can lead to joints appearing to stretch or appear less rigid. The lag happens because the physics system is trying to apply joint forces to fix constraints, while other physics forces are simultaneously still acting to break those same constraints. In addition to the conflicting forces acting on GameObjects, some joints are more stable and react faster than others.

Whatever constraints the joint provides, the joint only uses forces to fix the constraint. These are either a linear (straight line) force or angular (torque) force.

**Note**: It’s recommended to be cautious when applying large forces to Rigidbody objects that have joints attached, especially those with large masses, due to the conflicting forces acting on joints.

## Permanently breaking joints

All joints are able to monitor the force or torque that they’re applying to stay within its own constraints. Some joints monitor both force and torque while others monitor only force. This informs you of when a joint exceeds a specific force or torque in trying to maintain its constraints, and you can specify these thresholds as [`Joint2D.breakForce`](../../../ScriptReference/Joint2D-breakForce.html "../../../ScriptReference/Joint2D-breakForce.html") and [`Joint2D.breakTorque`](../../../ScriptReference/Joint2D-breakTorque.html "../../../ScriptReference/Joint2D-breakTorque.html"). When a joint exceeds these thresholds, it’s known as joint breaking.

You can specify the action to be taken when a joint breaks with [`Joint2D.breakAction`](../../../ScriptReference/Joint2D-breakAction.html "../../../ScriptReference/Joint2D-breakAction.html"). The default break action is to destroy the Joint2D component, and you can refer to [`JointBreakAction2D`](../../../ScriptReference/JointBreakAction2D.html "../../../ScriptReference/JointBreakAction2D.html") for other available fixed actions.

## Additional resources

* [API documentation on Joint2D](../../../ScriptReference/Joint2D.html "../../../ScriptReference/Joint2D.html")

Introduction to 2D joints

Distance Joint 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/wheel-joint-2d-fundamentals.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* [Wheel Joint 2D](../../2d-physics/joints/wheel-joint-2d-landing.html "../../2d-physics/joints/wheel-joint-2d-landing.html")
* Wheel Joint 2D fundamentals

Wheel Joint 2D

Wheel Joint 2D

# Wheel Joint 2D fundamentals

Use this joint to simulate wheels and suspension. The aim of the joint is to keep the position of two points on a line that extends to infinity, whilst at the same time making them overlap. Those two points can be two **Rigidbody2D** components or a **Rigidbody2D** component and a fixed position in the world. (Connect to a fixed position in the world by setting **Connected Rigidbody** to None).

Wheel Joint 2D acts like a combination of a [Slider Joint 2D](./slider-joint-2d-reference.html "./slider-joint-2d-reference.html") (without its motor or limit constraints) and a [Hinge Joint 2D](./hinge-joint-2d-reference.html "./hinge-joint-2d-reference.html") (without its limit constraint).

The joint applies a linear force to both connected rigid body objects to keep them on the line, an angular motor to rotate the objects on the line, and a spring to simulate wheel suspension.

Set the **Maximum Motor Speed** and **Maximum Motor Force** (torque, in this joint) to control the angular motor speed, and make the two rigid body objects rotate.

You can set the wheel suspension stiffness and movement in order to simulate different degrees of suspension. For example, to simulate a stiff, barely moving suspension:

* Set a high (1,000,000 is the highest) **Frequency** == stiff suspension.
* Set a high (1 is the highest) **Damping Ratio** == barely moving suspension.

To simulate a looser and more freely moving suspension, you would use the following settings:

* Set a low **Frequency** == loose suspension.
* Set a low **Damping Ratio** == moving suspension.

It has two simultaneous constraints:

* Maintain a zero relative linear distance away from a specified line between two anchor points on two rigid body objects.
* Maintain an angular speed between two anchor points on two rigid body objects. (Set the speed via the **Maximum Motor Speed** option and maximum torque via **Maximum Motor Force**.)

You can use this joint to construct physical objects that need to react as if they are connected with a rotational pivot but cannot move away from a specified line. Such as:

* Simulating wheels with a motor to drive the wheels and a line defining the movement allowed for the suspension.

## Behavior difference to the Wheel Collider

Unlike the [Wheel Collider](../../class-WheelCollider.html "../../class-WheelCollider.html")A special collider for grounded vehicles. It has built-in collision detection, wheel physics, and a slip-based tire friction model. It can be used for objects other than wheels, but it is specifically designed for vehicles with wheels. [More info](../../class-WheelCollider.html "../../class-WheelCollider.html")  
See in [Glossary](../../Glossary.html#WheelCollider "../../Glossary.html#WheelCollider") used with 3D physics, the Wheel Joint 2D uses a separate **Rigidbody** object for the wheel, which rotates when the force is applied. (The Wheel Collider, by contrast, simulates the suspension using a raycast and the wheel’s rotation is purely a graphical effect). The wheel object will typically be a [Circle Collider 2D](../collider/circle-collider-2d-reference.html "../collider/circle-collider-2d-reference.html") with a [Physics Material 2D](../physics-material-2d-reference.html "../physics-material-2d-reference.html")Use this to adjust the friction and bounce that occurs between 2D physics objects when they collide [More info](../../2d-physics/physics-material-2d-reference.html "../../2d-physics/physics-material-2d-reference.html")  
See in [Glossary](../../Glossary.html#PhysicsMaterial2D "../../Glossary.html#PhysicsMaterial2D") that gives the right amount of traction for your gameplay.

## Additional resources

* [Joints 2D](./2d-joints-landing.html "./2d-joints-landing.html")
* [Wheel Joint 2D component reference](wheel-joint-2d-reference.html "wheel-joint-2d-reference.html")

WheelJoint2D

Wheel Joint 2D

Wheel Joint 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/relative-joint-2d-landing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* Relative Joint 2D

Hinge Joint 2D component reference

Relative Joint 2D fundamentals

# Relative Joint 2D

Techniques and resources for working with Relative Joint 2D components.

| **Page** | **Description** |
| --- | --- |
| [Relative Joint 2D fundamentals](relative-joint-2d-fundamentals.html "relative-joint-2d-fundamentals.html") | Understand the Relative Joint 2D component and how it’s used to make two GameObjects maintain a position based on each other’s location |
| [Relative Joint 2D component reference](relative-joint-2d-reference.html "relative-joint-2d-reference.html") | Explore the properties of the Relative Joint 2D. |

Hinge Joint 2D component reference

Relative Joint 2D fundamentals

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/target-joint-2d-landing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* Target Joint 2D

Spring Joint 2D

Target Joint 2D fundamentals

# Target Joint 2D

Techniques and resources for working with Target Joint 2D components.

| **Page** | **Description** |
| --- | --- |
| [Target Joint 2D fundamentals](target-joint-2d-fundamentals.html "target-joint-2d-fundamentals.html") | Understand the Joint 2D component and how it’s used to connect to a specified target, rather than another Rigidbody object. |
| [Target Joint 2D component reference](target-joint-2d-reference.html "target-joint-2d-reference.html") | Explore the properties of the Target Joint 2D. |

Spring Joint 2D

Target Joint 2D fundamentals

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/spring-joint-2d-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* [Spring Joint 2D](../../2d-physics/joints/spring-joint-2d-landing.html "../../2d-physics/joints/spring-joint-2d-landing.html")
* Spring Joint 2D

Spring Joint 2D fundamentals

Target Joint 2D

# Spring Joint 2D

The **Spring Joint 2D** component allows two GameObjects controlled by Rigidbody physics to be attached together as if by a spring. The spring will apply a force along its axis between the two GameObjects, attempting to keep them a certain distance apart.

## Properties

| **Property** | **Function** |
| --- | --- |
| **Enable Collision** | Enable this property to enable collisions between the two connected GameObjects. |
| **Connected Rigidbody** | Specify the other object this joint connects to. Leave this as **None** to have the other end of the joint fixed at a point in space defined by the **Connected Anchor** property. Select the circle icon to the right to view a list of GameObjects to connect to. |
| **Auto Configure Connected Anchor** | Enable this property to automatically set the anchor location for the other object this joint connects to. You do not need to enter coordinates for the **Connected Anchor** property if you enable this property. |
| **Anchor** | Define where (in terms of x, y-coordinates on the **Rigidbody 2D**) the end point of the joint connects to the GameObject. |
| **Connected Anchor** | Define where (in terms of x, y-coordinates on the **Rigidbody 2D**) the end point of the joint connects to the other GameObject. |
| **Auto Configure Distance** | Enable this property to automatically detect the distance between the two GameObjects and set it as the distance that the joint keeps between the two GameObjects. |
| **Distance** | Set the distance that the spring should attempt to maintain between the two objects. (Can be set manually.) |
| **Damping Ratio** | Set the degree to suppress spring oscillation. In the range 0 to 1, the higher the value, the less movement. |
| **Frequency** | Set the frequency at which the spring oscillates while the GameObjects are approaching the separation distance you want (measured in cycles per second). In the range 0 to 1,000,000 - the higher the value, the stiffer the spring. **Note:** Setting **Frequency** to zero will create the stiffest spring type joint possible. |
| **Break Action** | Set the action taken when either the force or torque threshold is exceeded. |
| **Break Force** | Set the force threshold which if exceeded, will cause the joint to perform the selected **Break Action**. The default value is set to **Infinity**, which can never be exceeded and therefore the **Break Action** can never be taken while the threshold remains at this value. |

SpringJoint2D

Spring Joint 2D fundamentals

Target Joint 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/slider-joint-2d-fundamentals.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [2D joints](../../2d-physics/joints/2d-joints-landing.html "../../2d-physics/joints/2d-joints-landing.html")
* [Slider Joint 2D](../../2d-physics/joints/slider-joint-2d-landing.html "../../2d-physics/joints/slider-joint-2d-landing.html")
* Slider Joint 2D fundamentals

Slider Joint 2D

Slider Joint 2D

# Slider Joint 2D fundamentals

Use this joint slide GameObjects by maintaining the position of two points on a configurable line that extends to infinity. Those two points can be two **Rigidbody2D** components, or a **Rigidbody2D** component and a fixed position in the world (by setting **Connected Rigidbody** to **None**).

The joint applies a linear force to both connected Rigidbody objects to keep them on the line. It also has a simulated linear motor that applies linear force to move the Rigidbody GameObjects along the line. You can turn the motor off or on. Although the line is infinite, you can specify just a segment of the line that you want to use, using the **Translation Limits** option.

This joint has three simultaneous constraints. All are optional:

* Maintain a relative linear distance away from a specified line between two anchor points on two Rigidbody objects.
* Maintain a linear speed between two anchor points on two Rigidbody objects along a specified line. (The speed is limited with a maximum force.)
* Maintain a linear distance between two points along the specified line.

You can use this joint to construct physical objects that need to react as if they are connected together on a line. For example:

* A platform which can move up or down. The platform reacts by moving down when something lands on it but must never move sideways. You can use this joint to ensure platform to never moves up or down beyond certain limits. Use the motor to make the platform move up.

## Additional resources

* [Joints 2D](./2d-joints-landing.html "./2d-joints-landing.html")
* [Slider Joint 2D component reference](slider-joint-2d-reference.html "slider-joint-2d-reference.html")

SliderJoint2D

Slider Joint 2D

Slider Joint 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/joints/2d-joints-landing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* 2D joints

Surface Effector 2D reference

Introduction to 2D joints

# 2D joints

Approaches and techniques for working with 2D joints in Unity.

| **Page** | **Description** |
| --- | --- |
| [Introduction to 2D joints](introduction-to-2d-joints.html "introduction-to-2d-joints.html") | Understand the fundamental concepts of 2D joints. |
| [2D joint constraints](2d-joint-constraints.html "2d-joint-constraints.html") | Understand the constraints of using 2D joints. |
| [Distance Joint 2D](distance-joint-2d-landing.html "distance-joint-2d-landing.html") | Techinques and resources for working with Distance Joint 2D components. |
| [Fixed Joint 2D](fixed-joint-2d-landing.html "fixed-joint-2d-landing.html")A 2D joint type which is completely constrained, allowing two objects to be held together. Implemented as a spring so some small motion may still occur. [More info](../../2d-physics/joints/fixed-joint-2d-reference.html "../../2d-physics/joints/fixed-joint-2d-reference.html") See in [Glossary](../../Glossary.html#FixedJoint2D "../../Glossary.html#FixedJoint2D") | Techinques and resources for working with Fixed Joint 2D components. |
| [Friction Joint 2D](friction-joint-2d-landing.html "friction-joint-2d-landing.html") | Techinques and resources for working with Friction Joint 2D components. |
| [Hinge Joint 2D](hinge-joint-2d-landing.html "hinge-joint-2d-landing.html") | Techinques and resources for working with Hinge Joint 2D components. |
| [Relative Joint 2D](relative-joint-2d-landing.html "relative-joint-2d-landing.html")A 2D joint that allows two game objects controlled by Rigidbody physics to maintain in a position based on each other’s location. Use this joint to keep two objects offset from each other, at a position and angle you decide [More info](../../2d-physics/joints/relative-joint-2d-reference.html "../../2d-physics/joints/relative-joint-2d-reference.html") See in [Glossary](../../Glossary.html#RelativeJoint2D "../../Glossary.html#RelativeJoint2D") | Techinques and resources for working with Relative Joint 2D components. |
| [Slider Joint 2D](slider-joint-2d-landing.html "slider-joint-2d-landing.html") | Techinques and resources for working with Slider Joint 2D components. |
| [Spring Joint 2D](spring-joint-2d-landing.html "spring-joint-2d-landing.html") | Techinques and resources for working with Spring Joint 2D components. |
| [Target Joint 2D](target-joint-2d-landing.html "target-joint-2d-landing.html") | Techinques and resources for working with Target Joint 2D components. |
| [Wheel Joint 2D](wheel-joint-2d-landing.html "wheel-joint-2d-landing.html") | Techinques and resources for working with Wheel Joint 2D components. |

## Additional resources

* [3D joints](../../joints-section.html "../../joints-section.html")
* [API documentation on Joint2D](../../../ScriptReference/Joint2D.html "../../../ScriptReference/Joint2D.html")

Surface Effector 2D reference

Introduction to 2D joints

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/collider/polygon-collider-2d-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [Collider 2D](../../2d-physics/collider/collider-2d-landing.html "../../2d-physics/collider/collider-2d-landing.html")
* Polygon Collider 2D component reference

Box Collider 2D component reference

Edge Collider 2D component reference

# Polygon Collider 2D component reference

The Polygon Collider 2D component is a [Collider 2D](./collider-2d-landing.html "./collider-2d-landing.html") that interacts with the 2D physics system. This collider’s shape is a freeform edge of line segments that you can adjust to fit the shape of a sprite or any other shape. **Note**: The edge must completely enclose an area for the collider to work.

| **Property** | **Function** |
| --- | --- |
| **Edit Collider** | Select this to edit the collider’s geometry by editing and moving its vertices. |
| **Material** | Select the [Physics Material 2D](../physics-material-2d-reference.html "../physics-material-2d-reference.html")Use this to adjust the friction and bounce that occurs between 2D physics objects when they collide [More info](../../2d-physics/physics-material-2d-reference.html "../../2d-physics/physics-material-2d-reference.html") See in [Glossary](../../Glossary.html#PhysicsMaterial2D "../../Glossary.html#PhysicsMaterial2D") that determines properties of collisions, such as friction and bounce. |
| **Is Trigger** | Enable this if you want the collider to behave as a trigger. The physics system ignores the collider when you enable this option. |
| **Used By Effector** | Enable this if you want an attached Effector 2D component to use the collider. |
| **Auto Tiling** | Enable this if the [Sprite Renderer](../../sprite/renderer/sprite-renderer-reference.html "../../sprite/renderer/sprite-renderer-reference.html")A component that lets you display images as Sprites for use in both 2D and 3D scenes. [More info](../../sprite/renderer/sprite-renderer-reference.html "../../sprite/renderer/sprite-renderer-reference.html") See in [Glossary](../../Glossary.html#SpriteRenderer "../../Glossary.html#SpriteRenderer") component for the selected sprite has its **Draw Mode** set to **Tiled**. This enables automatic updates to the shape of the [Collider 2D](./collider-2d-landing.html "./collider-2d-landing.html"), allowing the shape to automatically readjust when the Sprite’s dimensions change. If you don’t enable **Auto Tiling**, the Collider 2D geometry doesn’t automatically repeat. |
| **Composite Operation** | If a [Composite Collider 2D](composite-collider/composite-collider-2d-reference.html "composite-collider/composite-collider-2d-reference.html") component is attached to the same GameObject, sets how the component combines the collision shapes. The options are:  * **None**: Doesn’t combine the collision shapes. * **Merge**: Combines the collision shapes. * **Intersect**: Creates a collision shape from the overlapping area of the collision shapes. * **Difference**: Creates a collision shape from the non-overlapping area of the collision shapes. * **Flip**: Creates a collision shape from the non-overlapping area of the collision shapes, but also includes the area outside the collision shapes.  **Note**: When you set the value to an option other than **None**, the Composite Collider 2D component controls the following properties: **Material**, **Is Trigger**, and **Used By Effector**. |
| **Offset** | Set the local offset values of the collider geometry. |
| **Use Delaunay Mesh** | Enables Unity using a Delaunay triangulation algorithm to generate the collision shapes. Enabling this property can improve collision shapes for complex shapes, but can reduce performance. |
| **Points** | Expand to view information about the complexity of the generated collider. |
| **Layer Overrides** | Expand for the layer override settings. |
| **Layer Override Priority** | Sets the decision priority when this collision shape collides with another collision shape. Refer to its [API](../../../ScriptReference/Collider2D-layerOverridePriority.html "../../../ScriptReference/Collider2D-layerOverridePriority.html") documentation for more information. |
| **Include Layers** | Sets the layers this collision shape collides with. Refer to [`Collider2D-includeLayers`](../../../ScriptReference/Collider2D-includeLayers.html "../../../ScriptReference/Collider2D-includeLayers.html"). |
| **Exclude Layers** | Sets the layers this collision shape doesn’t collide with. Refer to [`Collider2D-excludeLayers`](../../../ScriptReference/Collider2D-excludeLayers.html "../../../ScriptReference/Collider2D-excludeLayers.html"). |
| **Force Send Layers** | Sets the layers this collision shape sends forces to during collisions. Refer to [`Collider2D-forceSendLayers`](../../../ScriptReference/Collider2D-forceSendLayers.html "../../../ScriptReference/Collider2D-forceSendLayers.html"). |
| **Force Receive Layers** | Sets the layers this collision shape can receive forces from during collisions. Refer to [`Collider2D-forceReceiveLayers`](../../../ScriptReference/Collider2D-forceReceiveLayers.html "../../../ScriptReference/Collider2D-forceReceiveLayers.html"). |
| **Contact Capture Layers** | Sets the layers of other Collider 2D components to capture during collisions. Refer to [`Collider2D-contactCaptureLayers`](../../../ScriptReference/Collider2D-contactCaptureLayers.html "../../../ScriptReference/Collider2D-contactCaptureLayers.html"). |
| **Callback Layers** | Sets the layers to report collisions or triggers with. Refer to [`Collider2D-callbackLayers`](../../../ScriptReference/Collider2D-callbackLayers.html "../../../ScriptReference/Collider2D-callbackLayers.html"). |
| **Info** | Expand for read-only physics system related information about the collider. |

## Additional resources

* [Collider 2D API documentation](../../../ScriptReference/Collider2D.html "../../../ScriptReference/Collider2D.html")
* [Rigidbody 2D](../rigidbody/rigidbody-2d-landing.html "../rigidbody/rigidbody-2d-landing.html")

PolygonCollider2D

Box Collider 2D component reference

Edge Collider 2D component reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/collider/circle-collider-2d-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [Collider 2D](../../2d-physics/collider/collider-2d-landing.html "../../2d-physics/collider/collider-2d-landing.html")
* Circle Collider 2D component reference

Collider 2D

Box Collider 2D component reference

# Circle Collider 2D component reference

The Circle Collider 2D component is a [Collider 2D](./collider-2d-landing.html "./collider-2d-landing.html") that interacts with the 2D physics system for collision detection. This collider is circular in shape, with a defined position and radius within the local coordinate space of a sprite. Adjust the component properties to change the shape and behavior of the collider.

| **Property** | **Function** |
| --- | --- |
| **Material** | Select the [Physics Material 2D](../physics-material-2d-reference.html "../physics-material-2d-reference.html")Use this to adjust the friction and bounce that occurs between 2D physics objects when they collide [More info](../../2d-physics/physics-material-2d-reference.html "../../2d-physics/physics-material-2d-reference.html") See in [Glossary](../../Glossary.html#PhysicsMaterial2D "../../Glossary.html#PhysicsMaterial2D") that determines properties of collisions, such as friction and bounce. |
| **Is Trigger** | Enable this if you want the collider to behave as a trigger. The physics system ignores the collider when you enable this option. |
| **Used By Effector** | Enable this if you want an attached Effector 2D component to use the collider. |
| **Composite Operation** | If a [Composite Collider 2D](composite-collider/composite-collider-2d-reference.html "composite-collider/composite-collider-2d-reference.html") component is attached to the same GameObject, sets how the component combines the collision shapes. The options are:  * **None**: Doesn’t combine the collision shapes. * **Merge**: Combines the collision shapes. * **Intersect**: Creates a collision shape from the overlapping area of the collision shapes. * **Difference**: Creates a collision shape from the non-overlapping area of the collision shapes. * **Flip**: Creates a collision shape from the non-overlapping area of the collision shapes, but also includes the area outside the collision shapes.  **Note**: When you set the value to an option other than **None**, the Composite Collider 2D component controls the following properties: **Material**, **Is Trigger**, and **Used By Effector**. |
| **Offset** | Set the local offset values of the Collider 2D geometry. |
| **Radius** | Set the radius of the Circle Collider 2D in local space units. |
| **Layer Overrides** | Expand for the layer override settings. |
| **Layer Override Priority** | Sets the decision priority when this collision shape collides with another collision shape. Refer to its [API](../../../ScriptReference/Collider2D-layerOverridePriority.html "../../../ScriptReference/Collider2D-layerOverridePriority.html") documentation for more information. |
| **Include Layers** | Sets the layers this collision shape collides with. Refer to [`Collider2D-includeLayers`](../../../ScriptReference/Collider2D-includeLayers.html "../../../ScriptReference/Collider2D-includeLayers.html"). |
| **Exclude Layers** | Sets the layers this collision shape doesn’t collide with. Refer to [`Collider2D-excludeLayers`](../../../ScriptReference/Collider2D-excludeLayers.html "../../../ScriptReference/Collider2D-excludeLayers.html"). |
| **Force Send Layers** | Sets the layers this collision shape sends forces to during collisions. Refer to [`Collider2D-forceSendLayers`](../../../ScriptReference/Collider2D-forceSendLayers.html "../../../ScriptReference/Collider2D-forceSendLayers.html"). |
| **Force Receive Layers** | Sets the layers this collision shape can receive forces from during collisions. Refer to [`Collider2D-forceReceiveLayers`](../../../ScriptReference/Collider2D-forceReceiveLayers.html "../../../ScriptReference/Collider2D-forceReceiveLayers.html"). |
| **Contact Capture Layers** | Sets the layers of other Collider 2D components to capture during collisions. Refer to [`Collider2D-contactCaptureLayers`](../../../ScriptReference/Collider2D-contactCaptureLayers.html "../../../ScriptReference/Collider2D-contactCaptureLayers.html"). |
| **Callback Layers** | Sets the layers to report collisions or triggers with. Refer to [`Collider2D-callbackLayers`](../../../ScriptReference/Collider2D-callbackLayers.html "../../../ScriptReference/Collider2D-callbackLayers.html"). |

## Additional resources

* [Collider 2D API documentation](../../../ScriptReference/Collider2D.html "../../../ScriptReference/Collider2D.html")
* [Rigidbody 2D](../rigidbody/rigidbody-2d-landing.html "../rigidbody/rigidbody-2d-landing.html")

CircleCollider2D

Collider 2D

Box Collider 2D component reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/collider/edit-collider-geometry.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [Collider 2D](../../2d-physics/collider/collider-2d-landing.html "../../2d-physics/collider/collider-2d-landing.html")
* Edit the collider's geometry

Use a Custom Collider 2D

Edit Collider mode reference

# Edit the collider’s geometry

You can edit a collider’s geometry manually or have Unity generate its shape automatically.

Unity automatically generates a collider’s geometry when you drag a sprite into the scene and add a Collider 2D component to it. The generated collider shape matches the outline of the sprite as close as possible.

To edit the collider’s shape:

1. Select **Edit Collider** ![](../../../uploads/Main/edit-collider-inspector-icon.png) in the Inspector window to edit the collider’s geometry. You can also access the collider’s editing mode from the Tools overlay in the Scene view window.  
   ![The Edit Collider icon located at the bottom of the Tools overlay.](../../../uploads/Main/edit-collider-overlay.png)
2. To move an existing vertex, select and hold it, then move it to a new location.
3. To create a new vertex, hover your cursor over the outline of the collider’s shape. A dot shows the position of the cursor on the collider’s geometry. Click on the dot to create a new vertex at that position.
4. To remove a vertex, hold Ctrl (macOS:Cmd) while hovering your cursor over the edges of the collider’s geometry, which turn red. Click the red edges to remove the vertex that connects them.
5. Exit the collider editing mode by selecting **Edit Collider** in the Inspector window or Tools overlay again.

Use a Custom Collider 2D

Edit Collider mode reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/collider/collider-2d-landing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* Collider 2D

Rigidbody 2D Simulated property

Circle Collider 2D component reference

# Collider 2D

When you attach a collider 2D component to a GameObject, the collider 2D defines which area of the GameObject has collision and can interact with other colliders in the scene. The collider 2D is invisible, and it’s shape is about the same shape as the GameObject for more accurate collisions. You can adjust a collider’s shape and other properties in its Inspector window properties.

Colliders for 2D GameObjects all have names ending with 2D. You can’t use 3D GameObjects with 2D colliders, or 2D GameObjects with 3D colliders.

You can use the following types of collider 2Ds with [Rigidbody 2D](../rigidbody/rigidbody-2d-landing.html "../rigidbody/rigidbody-2d-landing.html"):

| **Page** | **Description** |
| --- | --- |
| [Circle Collider 2D component reference](circle-collider-2d-reference.html "circle-collider-2d-reference.html") | Refer to the Circle Collider 2D component properties to create circular colliders. |
| [Box Collider 2D component reference](box-collider-2d-reference.html "box-collider-2d-reference.html") | Refer to the Box Collider 2D component properties to create rectangular or square colliders. |
| [Polygon Collider 2D component reference](polygon-collider-2d-reference.html "polygon-collider-2d-reference.html") | Refer to the Polygon Collider 2D component properties to create freeform colliders. |
| [Edge Collider 2D component reference](edge-collider-2d-reference.html "edge-collider-2d-reference.html") | Refer to the Edge Collider 2D component properties to create freeform and open path collision areas. |
| [Capsule Collider 2D](capsule-collider/capsule-collider-2d-landing.html "capsule-collider/capsule-collider-2d-landing.html") | Techniques and resources for working with and configuring a Capsule Collider 2D. |
| [Composite Collider 2D](composite-collider/composite-collider-2d-landing.html "composite-collider/composite-collider-2d-landing.html") | Techniques and resources for working with and configuring a Composite Collider 2D. |
| [Custom Collider 2D](custom-collider/custom-collider-2d-landing.html "custom-collider/custom-collider-2d-landing.html") | Techniques and resources for working with and configuring a Custom Collider 2D. |
| [Edit the collider’s geometry](edit-collider-geometry.html "edit-collider-geometry.html") | Edit the geometry of a Collider 2D component. |
| [Edit Collider mode reference](edit-collider-mode-reference.html "edit-collider-mode-reference.html") | Explore the controls and keyboard shortcuts available when you edit a Collider 2D component. |

## Additional resources

* [Collider 2D API documentation](../../../ScriptReference/Collider2D.html "../../../ScriptReference/Collider2D.html")
* [Rigidbody 2D](../rigidbody/rigidbody-2d-landing.html "../rigidbody/rigidbody-2d-landing.html")
* [2D joints](../joints/2d-joints-landing.html "../joints/2d-joints-landing.html")

Rigidbody 2D Simulated property

Circle Collider 2D component reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/collider/edge-collider-2d-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [Collider 2D](../../2d-physics/collider/collider-2d-landing.html "../../2d-physics/collider/collider-2d-landing.html")
* Edge Collider 2D component reference

Polygon Collider 2D component reference

Capsule Collider 2D

# Edge Collider 2D component reference

The Edge Collider 2D component is a [Collider 2D](./collider-2d-landing.html "./collider-2d-landing.html") that interacts with the 2D physics system. The collider’s shape is an edge made of line segments that you can adjust to fit the shape of a sprite or any other shape. The collider’s start and end points don’t need to meet or enclose an area to function. Unlike the [Polygon Collider 2D](./polygon-collider-2d-reference.html "./polygon-collider-2d-reference.html"), they can form a straight line or other single edge shapes.

**Note**: Edge colliders can’t collide with other edge colliders, whatever their body type and trigger settings.

| **Property** | **Function** |
| --- | --- |
| **Edit Collider** | Select **Edit Collider** Edit Collider icon to make the collider outline editable. Refer to [Edit Collider mode reference](edit-collider-mode-reference.html "edit-collider-mode-reference.html") for the actions and shortcuts available when you enable **Edit Collider**. |
| **Material** | Select the [Physics Material 2D](../physics-material-2d-reference.html "../physics-material-2d-reference.html")Use this to adjust the friction and bounce that occurs between 2D physics objects when they collide [More info](../../2d-physics/physics-material-2d-reference.html "../../2d-physics/physics-material-2d-reference.html") See in [Glossary](../../Glossary.html#PhysicsMaterial2D "../../Glossary.html#PhysicsMaterial2D") that determines properties of collisions, such as friction and bounce. |
| **Is Trigger** | Enable this if you want the collider to behave as a trigger. The physics system ignores the collider when you enable this option. |
| **Used By Effector** | Enable this if you want an attached Effector 2D component to use the collider. |
| **Offset** | Set the local offset values of the collider geometry. |
| **Edge Radius** | Set a value that forms a radius around the edge of the collider. This results in a larger collider with rounded convex corners. The default value is 0 (no radius). |
| **Points** | Expand to view read-only information about the complexity of the generated Collider. |
| **Use Adjacent Start Point** | Enable this property to calculate the collision response using the **Adjacent Start Point** to form the collision normal when a collision occurs at the Edge Collider’s start point. |
| **Adjacent Start Point X/Y** | Set the x and y-coordinates of the **Adjacent Start Point**. |
| **Use Adjacent End Point** | Enable this property to calculate the collision response using the **Adjacent End Point** to form the collision normal when a collision occurs at the Edge Collider’s end point. |
| **Adjacent End Point X/Y** | Set the x and y-coordinates of the **Adjacent End Point**. |
| **Layer Overrides** | Expand for the layer override settings. |
| **Layer Override Priority** | Sets the decision priority when this collision shape collides with another collision shape. Refer to its [API](../../../ScriptReference/Collider2D-layerOverridePriority.html "../../../ScriptReference/Collider2D-layerOverridePriority.html") documentation for more information. |
| **Include Layers** | Sets the layers this collision shape collides with. Refer to [`Collider2D-includeLayers`](../../../ScriptReference/Collider2D-includeLayers.html "../../../ScriptReference/Collider2D-includeLayers.html"). |
| **Exclude Layers** | Sets the layers this collision shape doesn’t collide with. Refer to [`Collider2D-excludeLayers`](../../../ScriptReference/Collider2D-excludeLayers.html "../../../ScriptReference/Collider2D-excludeLayers.html"). |
| **Force Send Layers** | Sets the layers this collision shape sends forces to during collisions. Refer to [`Collider2D-forceSendLayers`](../../../ScriptReference/Collider2D-forceSendLayers.html "../../../ScriptReference/Collider2D-forceSendLayers.html"). |
| **Force Receive Layers** | Sets the layers this collision shape can receive forces from during collisions. Refer to [`Collider2D-forceReceiveLayers`](../../../ScriptReference/Collider2D-forceReceiveLayers.html "../../../ScriptReference/Collider2D-forceReceiveLayers.html"). |
| **Contact Capture Layers** | Sets the layers of other Collider 2D components to capture during collisions. Refer to [`Collider2D-contactCaptureLayers`](../../../ScriptReference/Collider2D-contactCaptureLayers.html "../../../ScriptReference/Collider2D-contactCaptureLayers.html"). |
| **Callback Layers** | Sets the layers to report collisions or triggers with. Refer to [`Collider2D-callbackLayers`](../../../ScriptReference/Collider2D-callbackLayers.html "../../../ScriptReference/Collider2D-callbackLayers.html"). |

## Additional resources

* [Collider 2D API documentation](../../../ScriptReference/Collider2D.html "../../../ScriptReference/Collider2D.html")
* [Rigidbody 2D](../rigidbody/rigidbody-2d-landing.html "../rigidbody/rigidbody-2d-landing.html")

EdgeCollider2D

Polygon Collider 2D component reference

Capsule Collider 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/collider/box-collider-2d-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [Collider 2D](../../2d-physics/collider/collider-2d-landing.html "../../2d-physics/collider/collider-2d-landing.html")
* Box Collider 2D component reference

Circle Collider 2D component reference

Polygon Collider 2D component reference

# Box Collider 2D component reference

The Box Collider 2D component is a [Collider 2D](./collider-2d-landing.html "./collider-2d-landing.html") that interacts with the 2D physics system for collision detection. This collider is a rectangle with a defined position, width, and height in the local coordinate space of a sprite. Adjust the component properties to change the shape and behavior of the collider.

**Note**: The selection rectangle is axis-aligned, with its edges parallel to the x or y axes of local space.

| **Property** | **Function** |
| --- | --- |
| **Material** | Select the [Physics Material 2D](../physics-material-2d-reference.html "../physics-material-2d-reference.html")Use this to adjust the friction and bounce that occurs between 2D physics objects when they collide [More info](../../2d-physics/physics-material-2d-reference.html "../../2d-physics/physics-material-2d-reference.html") See in [Glossary](../../Glossary.html#PhysicsMaterial2D "../../Glossary.html#PhysicsMaterial2D") that determines properties of collisions, such as friction and bounce. |
| **Is Trigger** | Enable this if you want the collider to behave as a trigger. The physics system ignores the collider when you enable this option. |
| **Used By Effector** | Enable this if you want an attached Effector 2D component to use the collider. |
| **Composite Operation** | If a [Composite Collider 2D](composite-collider/composite-collider-2d-reference.html "composite-collider/composite-collider-2d-reference.html") component is attached to the same GameObject, sets how the component combines the collision shapes. The options are:  * **None**: Doesn’t combine the collision shapes. * **Merge**: Combines the collision shapes. * **Intersect**: Creates a collision shape from the overlapping area of the collision shapes. * **Difference**: Creates a collision shape from the non-overlapping area of the collision shapes. * **Flip**: Creates a collision shape from the non-overlapping area of the collision shapes, but also includes the area outside the collision shapes.  **Note**: When you set the value to an option other than **None**, the Composite Collider 2D component controls the following properties: **Material**, **Is Trigger**, **Used By Effector**, and **Edge Radius**. |
| **Auto Tiling** | Enable this if the [Sprite Renderer](../../sprite/renderer/sprite-renderer-reference.html "../../sprite/renderer/sprite-renderer-reference.html")A component that lets you display images as Sprites for use in both 2D and 3D scenes. [More info](../../sprite/renderer/sprite-renderer-reference.html "../../sprite/renderer/sprite-renderer-reference.html") See in [Glossary](../../Glossary.html#SpriteRenderer "../../Glossary.html#SpriteRenderer") component for the selected Sprite has the **Draw Mode** set to **Tiled**. This enables automatic updates to the shape of the [Collider 2D](./collider-2d-landing.html "./collider-2d-landing.html"), allowing the shape to automatically readjust when the Sprite’s dimensions change. If you don’t enable **Auto Tiling**, the Collider 2D geometry doesn’t automatically repeat. |
| **Offset** | Set the local offset values of the collider geometry. |
| **Size** | Set the size of the box in local space units. |
| **Edge Radius** | Set a value that forms a radius around the edge of the collider. This results in a larger collider with rounded convex corners. The default value is 0 (no radius). |
| **Layer Overrides** | Expand for the layer override settings. |
| **Layer Override Priority** | Sets the decision priority when this collision shape collides with another collision shape. Refer to its [API](../../../ScriptReference/Collider2D-layerOverridePriority.html "../../../ScriptReference/Collider2D-layerOverridePriority.html") documentation for more information. |
| **Include Layers** | Sets the layers this collision shape collides with. Refer to [`Collider2D-includeLayers`](../../../ScriptReference/Collider2D-includeLayers.html "../../../ScriptReference/Collider2D-includeLayers.html"). |
| **Exclude Layers** | Sets the layers this collision shape doesn’t collide with. Refer to [`Collider2D-excludeLayers`](../../../ScriptReference/Collider2D-excludeLayers.html "../../../ScriptReference/Collider2D-excludeLayers.html"). |
| **Force Send Layers** | Sets the layers this collision shape sends forces to during collisions. Refer to [`Collider2D-forceSendLayers`](../../../ScriptReference/Collider2D-forceSendLayers.html "../../../ScriptReference/Collider2D-forceSendLayers.html"). |
| **Force Receive Layers** | Sets the layers this collision shape can receive forces from during collisions. Refer to [`Collider2D-forceReceiveLayers`](../../../ScriptReference/Collider2D-forceReceiveLayers.html "../../../ScriptReference/Collider2D-forceReceiveLayers.html"). |
| **Contact Capture Layers** | Sets the layers of other Collider 2D components to capture during collisions. Refer to [`Collider2D-contactCaptureLayers`](../../../ScriptReference/Collider2D-contactCaptureLayers.html "../../../ScriptReference/Collider2D-contactCaptureLayers.html"). |
| **Callback Layers** | Sets the layers to report collisions or triggers with. Refer to [`Collider2D-callbackLayers`](../../../ScriptReference/Collider2D-callbackLayers.html "../../../ScriptReference/Collider2D-callbackLayers.html"). |

## Additional resources

* [Collider 2D API documentation](../../../ScriptReference/Collider2D.html "../../../ScriptReference/Collider2D.html")
* [Rigidbody 2D](../rigidbody/rigidbody-2d-landing.html "../rigidbody/rigidbody-2d-landing.html")

BoxCollider2D

Circle Collider 2D component reference

Polygon Collider 2D component reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/collider/edit-collider-mode-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [Collider 2D](../../2d-physics/collider/collider-2d-landing.html "../../2d-physics/collider/collider-2d-landing.html")
* Edit Collider mode reference

Edit the collider's geometry

Effectors 2D

# Edit Collider mode reference

The actions and shortcuts available when you enable **Edit Collider**.

| Action | Function |
| --- | --- |
| **Click and drag vertex or edge** | Move the selected vertex and edge to a different position. |
| **Click anywhere along an edge** | Create a new vertex by clicking an empty space along the edge. |
| **Hold the Ctrl(macOS:Cmd) key and select a vertex or edge** | Deletes the selected vertex or edge. |

Edit the collider's geometry

Effectors 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/collider/composite-collider/composite-collider-2d-landing.html

* [2D game development](../../../Unity2D.html "../../../Unity2D.html")
* [2D physics](../../../2d-physics/2d-physics.html "../../../2d-physics/2d-physics.html")
* [Collider 2D](../../../2d-physics/collider/collider-2d-landing.html "../../../2d-physics/collider/collider-2d-landing.html")
* Composite Collider 2D

Configure Capsule Collider 2D

Composite Collider 2D component reference

# Composite Collider 2D

Techniques and resources for working with and configuring a Composite Collider 2D.

| **Page** | **Description** |
| --- | --- |
| [Composite Collider 2D component reference](composite-collider-2d-reference.html "composite-collider-2d-reference.html") | Refer to the Composite Collider 2D properties to merge other collider shapes into a single collider. |
| [Combine Colliders with the Composite Collider 2D](combine-colliders-composite-collider-2d.html "combine-colliders-composite-collider-2d.html") | Combine multiple Collider 2D into a single collider with the Composite Collider 2D. |

Configure Capsule Collider 2D

Composite Collider 2D component reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/collider/composite-collider/combine-colliders-composite-collider-2d.html

* [2D game development](../../../Unity2D.html "../../../Unity2D.html")
* [2D physics](../../../2d-physics/2d-physics.html "../../../2d-physics/2d-physics.html")
* [Collider 2D](../../../2d-physics/collider/collider-2d-landing.html "../../../2d-physics/collider/collider-2d-landing.html")
* [Composite Collider 2D](../../../2d-physics/collider/composite-collider/composite-collider-2d-landing.html "../../../2d-physics/collider/composite-collider/composite-collider-2d-landing.html")
* Combine Colliders with the Composite Collider 2D

Composite Collider 2D component reference

Custom Collider 2D

# Combine Colliders with the Composite Collider 2D

All the supported Collider components have the [Composite Operation](../../../../ScriptReference/Collider2D.CompositeOperation.html "../../../../ScriptReference/Collider2D.CompositeOperation.html") property, which allows them be composed into a single Collider with the Composite Collider 2D. These Colliders must also be attached to the same [Rigidbody 2D](../../rigidbody/introduction-to-rigidbody-2d.html "../../rigidbody/introduction-to-rigidbody-2d.html") as the Composite Collider 2D. When you select a **Composite Operation**, other properties disappear from that Collider, as they are now controlled by the Composite Collider 2D.

Refer to the [CompositeCollider2D](../../../../ScriptReference/CompositeCollider2D.html "../../../../ScriptReference/CompositeCollider2D.html") API documentation for more information about scripting with the Composite Collider 2D.

Composite Collider 2D component reference

Custom Collider 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/collider/composite-collider/composite-collider-2d-reference.html

* [2D game development](../../../Unity2D.html "../../../Unity2D.html")
* [2D physics](../../../2d-physics/2d-physics.html "../../../2d-physics/2d-physics.html")
* [Collider 2D](../../../2d-physics/collider/collider-2d-landing.html "../../../2d-physics/collider/collider-2d-landing.html")
* [Composite Collider 2D](../../../2d-physics/collider/composite-collider/composite-collider-2d-landing.html "../../../2d-physics/collider/composite-collider/composite-collider-2d-landing.html")
* Composite Collider 2D component reference

Composite Collider 2D

Combine Colliders with the Composite Collider 2D

# Composite Collider 2D component reference

The Composite Collider 2D component is a [Collider 2D](../collider-2d-landing.html "../collider-2d-landing.html") that interacts with the 2D physics system. Unlike most colliders, it doesn’t have an inherent shape. Instead, it merges the shapes of any [Box Collider 2D](../box-collider-2d-reference.html "../box-collider-2d-reference.html"), [Polygon Collider 2D](../polygon-collider-2d-reference.html "../polygon-collider-2d-reference.html"), [Circle Collider 2D](../circle-collider-2d-reference.html "../circle-collider-2d-reference.html") or [Capsule Collider 2D](../capsule-collider/capsule-collider-2d-reference.html "../capsule-collider/capsule-collider-2d-reference.html") that it’s set to use. The Composite Collider 2D component uses the vertices (geometry) from any of these colliders, and merges them together into new geometry controlled by the Composite Collider 2D component itself.

| **Property** | **Function** |
| --- | --- |
| **Material** | Select the [Physics Material 2D](../../physics-material-2d-reference.html "../../physics-material-2d-reference.html")Use this to adjust the friction and bounce that occurs between 2D physics objects when they collide [More info](../../../2d-physics/physics-material-2d-reference.html "../../../2d-physics/physics-material-2d-reference.html") See in [Glossary](../../../Glossary.html#PhysicsMaterial2D "../../../Glossary.html#PhysicsMaterial2D") that determines properties of collisions, such as friction and bounce. |
| **Is Trigger** | Enable this if you want the collider to behave as a trigger. The physics system ignores the collider when you enable this option. |
| **Used By Effector** | Enable this if you want an attached Effector 2D component to use the collider. |
| **Offset** | Set the local offset values of the collider geometry. |
| **Geometry Type** | Select the type of geometry to merge the vertices of the selected colliders into. Select either **Outlines** or **Polygons** from the dropdown menu. |
| **Outlines** | Select this to produce a collider with hollow outlines, identical to an [Edge Collider 2D](../edge-collider-2d-reference.html "../edge-collider-2d-reference.html"). |
| **Polygons** | Select this to produce a collider with solid polygons, identical to a [Polygon Collider 2D](../polygon-collider-2d-reference.html "../polygon-collider-2d-reference.html"). |
| **Use Delaunay Mesh** | Enables Unity using a Delaunay triangulation algorithm to generate the collision shapes. Enabling this property can improve collision shapes for complex shapes, but can reduce performance. |
| **Generation Type** | Select the geometry generation method used when either the Composite Collider 2D component changes, or when any of the colliders composing it change. |
| **Synchronous** | Select this to have Unity immediately generate new geometry when making a change to the Composite Collider 2D component or to any of the colliders composing it. |
| **Manual** | Select this to have Unity generate geometry only when you request it. To request generation, either call the [CompositeCollider2D.GenerateGeometry](../../../../ScriptReference/CompositeCollider2D.GenerateGeometry.html "../../../../ScriptReference/CompositeCollider2D.GenerateGeometry.html") scripting API, or select **Regenerate Geometry** in the **Inspector** window. |
| **Vertex Distance** | Set a value for the minimum spacing allowed for any vertices gathered from the combined colliders. Unity removes any vertex closer than this limit. This allows control over the effective resolution of the vertex compositing. |
| **Offset Distance** | Set the value to offset vertices when compositing multiple physics shapes. Unity combines any vertices between physics shapes within this distance value. **Note**: It’s recommended to not set this value higher than 1% of the Sprite’s length, as this can result in loss of detail when too many vertices combine together. |
| **Layer Overrides** | Expand for the layer override settings. |
| **Layer Override Priority** | Sets the decision priority when this collision shape collides with another collision shape. Refer to its [API](../../../../ScriptReference/Collider2D-layerOverridePriority.html "../../../../ScriptReference/Collider2D-layerOverridePriority.html") documentation for more information. |
| **Include Layers** | Sets the layers this collision shape collides with. Refer to [`Collider2D-includeLayers`](../../../../ScriptReference/Collider2D-includeLayers.html "../../../../ScriptReference/Collider2D-includeLayers.html"). |
| **Exclude Layers** | Sets the layers this collision shape doesn’t collide with. Refer to [`Collider2D-excludeLayers`](../../../../ScriptReference/Collider2D-excludeLayers.html "../../../../ScriptReference/Collider2D-excludeLayers.html"). |
| **Force Send Layers** | Sets the layers this collision shape sends forces to during collisions. Refer to [`Collider2D-forceSendLayers`](../../../../ScriptReference/Collider2D-forceSendLayers.html "../../../../ScriptReference/Collider2D-forceSendLayers.html"). |
| **Force Receive Layers** | Sets the layers this collision shape can receive forces from during collisions. Refer to [`Collider2D-forceReceiveLayers`](../../../../ScriptReference/Collider2D-forceReceiveLayers.html "../../../../ScriptReference/Collider2D-forceReceiveLayers.html"). |
| **Contact Capture Layers** | Sets the layers of other Collider 2D components to capture during collisions. Refer to [`Collider2D-contactCaptureLayers`](../../../../ScriptReference/Collider2D-contactCaptureLayers.html "../../../../ScriptReference/Collider2D-contactCaptureLayers.html"). |
| **Callback Layers** | Sets the layers to report collisions or triggers with. Refer to [`Collider2D-callbackLayers`](../../../../ScriptReference/Collider2D-callbackLayers.html "../../../../ScriptReference/Collider2D-callbackLayers.html"). |

## Additional resources

* [Collider 2D API documentation](../../../../ScriptReference/Collider2D.html "../../../../ScriptReference/Collider2D.html")
* [Rigidbody 2D](../../rigidbody/rigidbody-2d-landing.html "../../rigidbody/rigidbody-2d-landing.html")

CompositeCollider2D

Composite Collider 2D

Combine Colliders with the Composite Collider 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/collider/capsule-collider/capsule-collider-2d-reference.html

* [2D game development](../../../Unity2D.html "../../../Unity2D.html")
* [2D physics](../../../2d-physics/2d-physics.html "../../../2d-physics/2d-physics.html")
* [Collider 2D](../../../2d-physics/collider/collider-2d-landing.html "../../../2d-physics/collider/collider-2d-landing.html")
* [Capsule Collider 2D](../../../2d-physics/collider/capsule-collider/capsule-collider-2d-landing.html "../../../2d-physics/collider/capsule-collider/capsule-collider-2d-landing.html")
* Capsule Collider 2D component reference

Capsule Collider 2D

Configure Capsule Collider 2D

# Capsule Collider 2D component reference

The Capsule Collider 2D component is a [Collider 2D](../collider-2d-landing.html "../collider-2d-landing.html") that interacts with the 2D physics system. The capsule shape of the collider, with its smooth, round circumference and absence of vertex corners, allows for smoother movement along other colliders, preventing snagging on sharp corners.

**Note**: The capsule shape of the collider is solid and not hollow. Unity regards any other colliders that are inside the collider to be in constant contact with it. The colliders inside are gradually forced out of the collision shape over time.

| **Property** | **Function** |
| --- | --- |
| **Material** | Select the [Physics Material 2D](../../physics-material-2d-reference.html "../../physics-material-2d-reference.html")Use this to adjust the friction and bounce that occurs between 2D physics objects when they collide [More info](../../../2d-physics/physics-material-2d-reference.html "../../../2d-physics/physics-material-2d-reference.html") See in [Glossary](../../../Glossary.html#PhysicsMaterial2D "../../../Glossary.html#PhysicsMaterial2D") that determines properties of collisions, such as friction and bounce. |
| **Is Trigger** | Enable this if you want the collider to behave as a trigger. The physics system ignores the collider when you enable this option. |
| **Used By Effector** | Enable this if you want an attached Effector 2D component to use the collider. |
| **Composite Operation** | If a [Composite Collider 2D](../composite-collider/composite-collider-2d-reference.html "../composite-collider/composite-collider-2d-reference.html") component is attached to the same GameObject, sets how the component combines the collision shapes. The options are:  * **None**: Doesn’t combine the collision shapes. * **Merge**: Combines the collision shapes. * **Intersect**: Creates a collision shape from the overlapping area of the collision shapes. * **Difference**: Creates a collision shape from the non-overlapping area of the collision shapes. * **Flip**: Creates a collision shape from the non-overlapping area of the collision shapes, but also includes the area outside the collision shapes.  **Note**: When you set the value to an option other than **None**, the Composite Collider 2D component controls the following properties: **Material**, **Is Trigger**, and **Used By Effector**. |
| **Offset** | Set the local offset values of the collider geometry. |
| **Size** | Set the x and y values to define the size of the box region that the collider fills. |
| **Direction** | Select the orientation of the collider. This determines the position and orientation of the curved ends of the collider shape. Refer to [Configure Capsule Collider 2D](configure-capsule-collider-2d.html "configure-capsule-collider-2d.html") for more details. |
| **Vertical** | Select this to orient the ends of the collider shape upwards and downwards. |
| **Horizontal** | Select this to orient the ends of the collider shape left and right. |
| **Layer Overrides** | Expand for the layer override settings. |
| **Layer Override Priority** | Sets the decision priority when this collision shape collides with another collision shape. Refer to its [API](../../../../ScriptReference/Collider2D-layerOverridePriority.html "../../../../ScriptReference/Collider2D-layerOverridePriority.html") documentation for more information. |
| **Include Layers** | Sets the layers this collision shape collides with. Refer to [`Collider2D-includeLayers`](../../../../ScriptReference/Collider2D-includeLayers.html "../../../../ScriptReference/Collider2D-includeLayers.html"). |
| **Exclude Layers** | Sets the layers this collision shape doesn’t collide with. Refer to [`Collider2D-excludeLayers`](../../../../ScriptReference/Collider2D-excludeLayers.html "../../../../ScriptReference/Collider2D-excludeLayers.html"). |
| **Force Send Layers** | Sets the layers this collision shape sends forces to during collisions. Refer to [`Collider2D-forceSendLayers`](../../../../ScriptReference/Collider2D-forceSendLayers.html "../../../../ScriptReference/Collider2D-forceSendLayers.html"). |
| **Force Receive Layers** | Sets the layers this collision shape can receive forces from during collisions. Refer to [`Collider2D-forceReceiveLayers`](../../../../ScriptReference/Collider2D-forceReceiveLayers.html "../../../../ScriptReference/Collider2D-forceReceiveLayers.html"). |
| **Contact Capture Layers** | Sets the layers of other Collider 2D components to capture during collisions. Refer to [`Collider2D-contactCaptureLayers`](../../../../ScriptReference/Collider2D-contactCaptureLayers.html "../../../../ScriptReference/Collider2D-contactCaptureLayers.html"). |
| **Callback Layers** | Sets the layers to report collisions or triggers with. Refer to [`Collider2D-callbackLayers`](../../../../ScriptReference/Collider2D-callbackLayers.html "../../../../ScriptReference/Collider2D-callbackLayers.html"). |

## Additional resources

* [Collider 2D API documentation](../../../../ScriptReference/Collider2D.html "../../../../ScriptReference/Collider2D.html")
* [Rigidbody 2D](../../rigidbody/rigidbody-2d-landing.html "../../rigidbody/rigidbody-2d-landing.html")

CapsuleCollider2D

Capsule Collider 2D

Configure Capsule Collider 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/collider/capsule-collider/configure-capsule-collider-2d.html

* [2D game development](../../../Unity2D.html "../../../Unity2D.html")
* [2D physics](../../../2d-physics/2d-physics.html "../../../2d-physics/2d-physics.html")
* [Collider 2D](../../../2d-physics/collider/collider-2d-landing.html "../../../2d-physics/collider/collider-2d-landing.html")
* [Capsule Collider 2D](../../../2d-physics/collider/capsule-collider/capsule-collider-2d-landing.html "../../../2d-physics/collider/capsule-collider/capsule-collider-2d-landing.html")
* Configure Capsule Collider 2D

Capsule Collider 2D component reference

Composite Collider 2D

# Configure Capsule Collider 2D

There are multiple properties for a Capsule Collider 2D that you must configure before it can be used correctly.

## Defining size and direction

The settings that define the shape of the Capsule Collider 2D are **Size** and **Direction**. Both the Size and Direction properties refer to **X** and **Y** (horizontal and vertical, respectively) in the local space of the Capsule Collider 2D, and not in world space.

A typical way to set up the Capsule Collider 2D is to set the **Size** to match the **Direction**. For example, if the Capsule Collider 2D’s **Direction** is **Vertical**, the **Size** of **X** is 0.5 and the **Size** of **Y** is 1, this makes the vertical direction capsule taller, rather than wider.

In the example below, the **X** and **Y** are represented by the yellow lines.

![An example of a Capsule Collider 2D set so the Size matches Direction](../../../../uploads/Main/CapsuleCollider2D-Example1.png)


An example of a Capsule Collider 2D set so the **Size** matches **Direction**

## Capsule configuration examples

You can change the Capsule Collider 2D with different configurations. Below are some examples.

Note that when the **X** and **Y** of the **Size** property are the same, the Capsule Collider 2D always approximates to a circle.

![Examples of Capsule Collider 2D configurations](../../../../uploads/Main/CapsuleCollider2D-Example2.png)


Examples of Capsule Collider 2D configurations

**Note:** A known issue in the 2D physics system is that when a GameObject moves across multiple Colliders, one or several of the Colliders may register a collision between the Colliders. This may occur even when the Colliders are perfectly aligned. This collision can cause the Collider to slow down or stop.

While constructing a surface with the Capsule Collider 2D can help reduce this problem, it is recommeneded to use a single Collider rather than multiple Colliders for a surface, such as the [Edge Collider 2D](../edge-collider-2d-reference.html "../edge-collider-2d-reference.html").

Capsule Collider 2D component reference

Composite Collider 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/collider/capsule-collider/capsule-collider-2d-landing.html

* [2D game development](../../../Unity2D.html "../../../Unity2D.html")
* [2D physics](../../../2d-physics/2d-physics.html "../../../2d-physics/2d-physics.html")
* [Collider 2D](../../../2d-physics/collider/collider-2d-landing.html "../../../2d-physics/collider/collider-2d-landing.html")
* Capsule Collider 2D

Edge Collider 2D component reference

Capsule Collider 2D component reference

# Capsule Collider 2D

Techniques and resources for working with and configuring a Capsule Collider 2D.

| **Page** | **Description** |
| --- | --- |
| [Capsule Collider 2D component reference](capsule-collider-2d-reference.html "capsule-collider-2d-reference.html") | Refer to the Capsule Collider 2D component properties to create cylindrical shaped collision areas with round ends. |
| [Configure Capsule Collider 2D](configure-capsule-collider-2d.html "configure-capsule-collider-2d.html") | Configure a Capsule Collider 2D to function correctly. |

Edge Collider 2D component reference

Capsule Collider 2D component reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/collider/custom-collider/custom-collider-2d-reference.html

* [2D game development](../../../Unity2D.html "../../../Unity2D.html")
* [2D physics](../../../2d-physics/2d-physics.html "../../../2d-physics/2d-physics.html")
* [Collider 2D](../../../2d-physics/collider/collider-2d-landing.html "../../../2d-physics/collider/collider-2d-landing.html")
* [Custom Collider 2D](../../../2d-physics/collider/custom-collider/custom-collider-2d-landing.html "../../../2d-physics/collider/custom-collider/custom-collider-2d-landing.html")
* Custom Collider 2D component reference

Custom Collider 2D

Use a Custom Collider 2D

# Custom Collider 2D component reference

The Custom Collider 2D is a [Collider 2D](../collider-2d-landing.html "../collider-2d-landing.html") that interacts with the 2D physics system. Unlike other colliders, you don’t configure this collider in the Unity Editor, instead you configure the collider by assigning [PhysicsShape2D](../../../../ScriptReference/PhysicsShape2D.html "../../../../ScriptReference/PhysicsShape2D.html") geometry to it via the [PhysicsShapeGroup2D](../../../../ScriptReference/PhysicsShapeGroup2D.html "../../../../ScriptReference/PhysicsShapeGroup2D.html") API.

You can define the collider’s shape by adding, removing, and modifying the `PhysicsShape2D` shapes. Refer to the [PhysicsShape2D](../../../../ScriptReference/PhysicsShapeGroup2D.html "../../../../ScriptReference/PhysicsShapeGroup2D.html") API documentation for more information. This also means that a Custom Collider 2D component can contain an unlimited number of low-level `PhysicsShape2D` and form any shape, or emulate other types of colliders.

| **Property** | **Function** |
| --- | --- |
| **Material** | Select the [Physics Material 2D](../../physics-material-2d-reference.html "../../physics-material-2d-reference.html")Use this to adjust the friction and bounce that occurs between 2D physics objects when they collide [More info](../../../2d-physics/physics-material-2d-reference.html "../../../2d-physics/physics-material-2d-reference.html") See in [Glossary](../../../Glossary.html#PhysicsMaterial2D "../../../Glossary.html#PhysicsMaterial2D") that determines properties of collisions, such as friction and bounce. |
| **Is Trigger** | Enable this if you want the collider to behave as a trigger. The physics system ignores the collider when you enable this option. |
| **Used By Effector** | Enable this if you want an attached Effector 2D component to use the collider. |
| **Offset** | Set the local offset values of the collider geometry. |
| **Custom Shape Count** (Read only) | Indicates how many `PhysicsShape2D` shapes the collider is using. |
| **Custom Vertex Count** (Read only) | Indicates the total number of vertices across all `PhysicsShape2D` shapes in the collider. |
| **Layer Overrides** | Expand for the layer override settings. |
| **Layer Override Priority** | Sets the decision priority when this collision shape collides with another collision shape. Refer to its [API](../../../../ScriptReference/Collider2D-layerOverridePriority.html "../../../../ScriptReference/Collider2D-layerOverridePriority.html") documentation for more information. |
| **Include Layers** | Sets the layers this collision shape collides with. Refer to [`Collider2D-includeLayers`](../../../../ScriptReference/Collider2D-includeLayers.html "../../../../ScriptReference/Collider2D-includeLayers.html"). |
| **Exclude Layers** | Sets the layers this collision shape doesn’t collide with. Refer to [`Collider2D-excludeLayers`](../../../../ScriptReference/Collider2D-excludeLayers.html "../../../../ScriptReference/Collider2D-excludeLayers.html"). |
| **Force Send Layers** | Sets the layers this collision shape sends forces to during collisions. Refer to [`Collider2D-forceSendLayers`](../../../../ScriptReference/Collider2D-forceSendLayers.html "../../../../ScriptReference/Collider2D-forceSendLayers.html"). |
| **Force Receive Layers** | Sets the layers this collision shape can receive forces from during collisions. Refer to [`Collider2D-forceReceiveLayers`](../../../../ScriptReference/Collider2D-forceReceiveLayers.html "../../../../ScriptReference/Collider2D-forceReceiveLayers.html"). |
| **Contact Capture Layers** | Sets the layers of other Collider 2D components to capture during collisions. Refer to [`Collider2D-contactCaptureLayers`](../../../../ScriptReference/Collider2D-contactCaptureLayers.html "../../../../ScriptReference/Collider2D-contactCaptureLayers.html"). |
| **Callback Layers** | Sets the layers to report collisions or triggers with. Refer to [`Collider2D-callbackLayers`](../../../../ScriptReference/Collider2D-callbackLayers.html "../../../../ScriptReference/Collider2D-callbackLayers.html"). |

## Additional resources

* [Collider 2D API documentation](../../../../ScriptReference/Collider2D.html "../../../../ScriptReference/Collider2D.html")
* [Rigidbody 2D](../../rigidbody/rigidbody-2d-landing.html "../../rigidbody/rigidbody-2d-landing.html")

CustomCollider2D

Custom Collider 2D

Use a Custom Collider 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/collider/custom-collider/custom-collider-2d-landing.html

* [2D game development](../../../Unity2D.html "../../../Unity2D.html")
* [2D physics](../../../2d-physics/2d-physics.html "../../../2d-physics/2d-physics.html")
* [Collider 2D](../../../2d-physics/collider/collider-2d-landing.html "../../../2d-physics/collider/collider-2d-landing.html")
* Custom Collider 2D

Combine Colliders with the Composite Collider 2D

Custom Collider 2D component reference

# Custom Collider 2D

Techniques and resources for working with and configuring a Custom Collider 2D.

| **Page** | **Description** |
| --- | --- |
| [Custom Collider 2D component reference](custom-collider-2d-reference.html "custom-collider-2d-reference.html") | Refer to the Custom Collider 2D properties to create customizable collision geometry. |
| [Use a Custom Collider 2D](use-custom-collider-2d.html "use-custom-collider-2d.html") | Use a Custom Collider 2D to create a collider with a unique shape and properties. |

Combine Colliders with the Composite Collider 2D

Custom Collider 2D component reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/collider/custom-collider/use-custom-collider-2d.html

* [2D game development](../../../Unity2D.html "../../../Unity2D.html")
* [2D physics](../../../2d-physics/2d-physics.html "../../../2d-physics/2d-physics.html")
* [Collider 2D](../../../2d-physics/collider/collider-2d-landing.html "../../../2d-physics/collider/collider-2d-landing.html")
* [Custom Collider 2D](../../../2d-physics/collider/custom-collider/custom-collider-2d-landing.html "../../../2d-physics/collider/custom-collider/custom-collider-2d-landing.html")
* Use a Custom Collider 2D

Custom Collider 2D component reference

Edit the collider's geometry

# Use a Custom Collider 2D

When assigning `PhysicsShape2D` to the Custom Collider 2D, you can do so either during Edit mode or Play mode. When modifying the Custom Collider 2D in Edit mode, Unity saves all assigned `PhysicsShape2D` and associated vertices in the Unity Scene, and the `CustomCollider2D` retains its configuration when the Scene is loaded. This makes it possible to use Edit mode authoring scripts to create custom geometry.

When modifying the Custom Collider 2D during Play mode, the Collider will not retain any changes made to assigned `PhysicsShape2D` and their associated vertices, and all changes will be lost when exiting Play mode.

Custom Collider 2D component reference

Edit the collider's geometry

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/effectors/effectors-2d-landing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* Effectors 2D

Edit Collider mode reference

Area Effector 2D reference

# Effectors 2D

Use Effector 2D [components](../../UsingComponents.html "../../UsingComponents.html")A functional part of a GameObject. A GameObject can contain any number of components. Unity has many built-in components, and you can create your own by writing scripts that inherit from MonoBehaviour. [More info](../../UsingComponents.html "../../UsingComponents.html")  
See in [Glossary](../../Glossary.html#component "../../Glossary.html#component") with [Collider 2D](../collider/collider-2d-landing.html "../collider/collider-2d-landing.html") components to direct the forces of [physics](../../PhysicsSection.html "../../PhysicsSection.html") when [GameObject](../../GameObjects.html "../../GameObjects.html")The fundamental object in Unity scenes, which can represent characters, props, scenery, cameras, waypoints, and more. A GameObject’s functionality is defined by the Components attached to it. [More info](../../class-GameObject.html "../../class-GameObject.html")  
See in [Glossary](../../Glossary.html#GameObject "../../Glossary.html#GameObject") colliders come into contact with each other. You can use the following Effectors 2D components in Unity:

| **Page** | **Description** |
| --- | --- |
| [Area Effector 2D reference](area-effector-2d-reference.html "area-effector-2d-reference.html") | Explore the properties of the Area Effector 2D used to arbitrarily vary force and angle magnitude. |
| [Buoyancy Effector 2D reference](buoyancy-effector-2d-reference.html "buoyancy-effector-2d-reference.html") | Explore the properties of the Buoyancy Effector 2D used to simulate buoyancy, fluid flow and fluid drag. |
| [Point Effector 2D reference](point-effector-2d-reference.html "point-effector-2d-reference.html") | Explore the properties of the Point Effector 2D used to attract or repulse against a given source point. |
| [Platform Effector 2D reference](platform-effector-2d-reference.html "platform-effector-2d-reference.html") | Explore the properties of the Platform Effector 2D used to create platform behavior, such as one-way collisions. |
| [Surface Effector 2D reference](surface-effector-2d-reference.html "surface-effector-2d-reference.html") | Explore the properties of the Surface Effector 2D used to create conveyor belts. |

## Additional resources

* [API documentation on Effector2D](../../../ScriptReference/Effector2D.html "../../../ScriptReference/Effector2D.html")

Edit Collider mode reference

Area Effector 2D reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/effectors/surface-effector-2d-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [Effectors 2D](../../2d-physics/effectors/effectors-2d-landing.html "../../2d-physics/effectors/effectors-2d-landing.html")
* Surface Effector 2D reference

Platform Effector 2D reference

2D joints

# Surface Effector 2D reference

The Surface Effector 2D applies tangent forces along the surfaces of colliders used by the effector in an attempt to match a specified speed along the surface. This is analogous to a conveyor belt.

Colliders that you use with the effector would typically be set as non-triggers so that other colliders can come into contact with the surface.

## Properties

| **Property** | **Function** |
| --- | --- |
| **Use Collider Mask** | Enable this to use the **Collider Mask** property. If this not enabled, the global collision matrix will be used as the default for all Collider 2Ds. |
| **Collider Mask** | The mask used to select specific Layers allowed to interact with the effector. Note that this option only displays if you have selected **Use Collider Mask**. |
| **Speed** | Enter the speed to keep along the surface. |
| **Speed Variation** | Enter a value here to apply a random increase in speed, where Unity selects a random number between 0 and the **Speed Variation** value. Entering a negative number here will result in a random reduction in speed instead, where Unity selects a random negative number between 0 and the **Speed Variation** value. |
| **Force Scale** | Enter a value to scale the force that’s applied when the effector attempts to meet the specified **Speed** along the surface. If this is 0, then Unity applies no force. If this is 1, then Unity applies full force. **Note:** Entering 1 to apply full force can counteract any other forces being applied to the target object and cause unwanted movement or behavior. It’s recommended to enter a value less than 1 to prevent this issue from happening. |
| **Use Contact Force** | Enable this to have Unity apply force at the point of contact between the surface and the target collider. Enabling contact forces can cause the target object to rotate when in contact with a surface. |
| **Use Friction** | Enable this to enable friction between the collider and the surface it contacts. |
| **Use Bounce** | Enable this to enable bounce between the collider and the surface it contacts. |

SurfaceEffector2D

Platform Effector 2D reference

2D joints

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/effectors/buoyancy-effector-2d-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [Effectors 2D](../../2d-physics/effectors/effectors-2d-landing.html "../../2d-physics/effectors/effectors-2d-landing.html")
* Buoyancy Effector 2D reference

Area Effector 2D reference

Point Effector 2D reference

# Buoyancy Effector 2D reference

The Buoyancy Effector 2D defines simple fluid behaviour such as floating and the drag and flow of fluid. You can also control a fluid surface, with the fluid behaviour taking place below.

## Properties

| **Property** | **Function** |
| --- | --- |
| **Use Collider Mask** | Check this box to enable the ‘Collider Mask’ property. If this is not enabled, the Global Collision Matrix will be used as the default for all Collider 2Ds. |
| **Collider Mask** | The mask used to select specific Layers allowed to interact with the effector. Note that this option only displays if you have selected **Use Collider Mask**. |
| **Surface Level** | Defines the surface location of the buoyancy fluid. When a GameObject is above this line, no buoyancy forces are applied. When a GameObject is intersecting or completely below this line, buoyancy forces are applied. This is a location specified as a world-space offset along the world y-axis, but is also scaled by the GameObject’s **Transform** component. |
| **Density** | The density of the fluid. Colliders with a higher density sink, those with a lower density float, and those with the same density appear suspended in the fluid. |
| **Linear Damping** | The drag coefficient affecting positional movement of a GameObject. This only applies when inside the fluid. |
| **Angular Damping** | The drag coefficient affecting rotational movement of a GameObject. This only applies when inside the fluid. |
| **Flow Angle** | The world-space angle (in degrees) for the direction of fluid flow. Fluid flow applies buoyancy forces in the specified direction. |
| **Flow Magnitude** | The “power” of the fluid flow force. Combined with **Fluid Angle**, this specifies the level of buoyancy force applied to GameObjects inside the fluid. The magnitude can also be negative, in which case the buoyancy forces are applied at 180 degrees to the **Flow Angle.** |
| **Flow Variation** | Enter a value here to randomly vary the fluid forces. Specify a positive or negative variation to randomly add or subtract from the **Fluid Magnitude**. |

BuoyancyEffector2D

Area Effector 2D reference

Point Effector 2D reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/effectors/platform-effector-2d-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [Effectors 2D](../../2d-physics/effectors/effectors-2d-landing.html "../../2d-physics/effectors/effectors-2d-landing.html")
* Platform Effector 2D reference

Point Effector 2D reference

Surface Effector 2D reference

# Platform Effector 2D reference

The Platform Effector 2D applies various platform behavior such as one-way collisions, removal of side-friction/bounce and more.

Colliders used with the Effector are typically not set as triggers so that other colliders can collide with it.

## Properties

| **Property** | **Function** |
| --- | --- |
| **Use Collider Mask** | Select this option to indicate the use of the Collider Mask property. If this isn’t selected, the global collision matrix is chosen as the default for all colliders. |
| **Collider Mask** | The mask used to select specific layers allowed to interact with the Effector. |
| **Use One Way** | Select this option to indicate if one-way collision behavior is used. |
| **Use One Way Grouping** | Ensures that all contacts disabled by the one-way behavior act on all colliders. This is useful when using multiple colliders on the object passing through the platform and they all need to act together as a group. |
| **Surface Arc** | The angle of an arc centered on the local “up” defines the surface which doesn’t allow colliders to pass. Anything outside of this arc is considered for one-way collision. |
| **Use Side Friction** | Select this option to indicate if the friction is used on the platform sides. |
| **Use Side Bounce** | Select to indicate if bounce is used on the platform sides. |
| **Side Arc** | The angle of an arc that defines the sides of the platform centered on the local “left” and “right” of the Effector. Any collision normals within this arc are considered for the “side” behaviors. |

PlatformEffector2D

Point Effector 2D reference

Surface Effector 2D reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/effectors/area-effector-2d-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [Effectors 2D](../../2d-physics/effectors/effectors-2d-landing.html "../../2d-physics/effectors/effectors-2d-landing.html")
* Area Effector 2D reference

Effectors 2D

Buoyancy Effector 2D reference

# Area Effector 2D reference

The Area Effector 2D applies forces within an area defined by the attached Collider 2Ds when another (target) Collider 2D comes into contact with the Effector 2D. You can configure the force at any angle with a specific magnitude and random variation on that magnitude. You can also apply both linear and angular drag forces to slow down Rigidbody 2Ds.

Collider 2Ds that you use with the Area Effector 2D would typically be set as triggers, so that other Collider 2Ds can overlap with it to have forces applied. Non-triggers will still work, but forces will only be applied when Collider 2Ds come into contact with them.

## Properties

| **Property** | **Function** |
| --- | --- |
| **Use Collider Mask** | Check to enable use of the **Collider Mask** property? If this is not enabled, the Global Collision Matrix will be used as the default for all Collider 2Ds. |
| **Collider Mask** | The mask used to select specific Layers allowed to interact with the Area Effector 2D. |
| **Use Global Angle** | Check this to define the **Force Angle** as a global (world-space) angle. If this is not checked, the **Force Angle** is considered a local angle by the physics engine. |
| **Force Angle** | The angle of the force to be applied. |
| **Force Magnitude** | The magnitude of the force to be applied. |
| **Force Variation** | The variation of the magnitude of the force to be applied. |
| **Drag** | The linear drag to apply to Rigidbody 2Ds. |
| **Angular Drag** | The angular drag to apply to Rigidbody 2Ds. The options are:  * **Collider**: Defines the target point as the current position of the Collider 2D. Applying force here can generate torque (rotation) if the Collider 2D isn’t positioned at the center of mass. * **Rigidbody**: Defines the target point as the current center of mass of the Rigidbody 2D. Applying force here will never generate torque (rotation). |

AreaEffector2D

Effectors 2D

Buoyancy Effector 2D reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/effectors/point-effector-2d-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [Effectors 2D](../../2d-physics/effectors/effectors-2d-landing.html "../../2d-physics/effectors/effectors-2d-landing.html")
* Point Effector 2D reference

Buoyancy Effector 2D reference

Platform Effector 2D reference

# Point Effector 2D reference

The Point Effector 2D applies forces to attract/repulse against a source point which can be defined as the position of the rigid-body or the center of a collider used by the effector. When another (target) collider comes into contact with the effector then a force is applied to the target. Where the force is applied and how it is calculated can be controlled.

Colliders that you use with the effector would typically be set as triggers so that other colliders can overlap with it to have forces applied however, non-triggers will still work but forces will only be applied when colliders come into contact with it.

## Properties

| **Property** | **Function** |
| --- | --- |
| **Use Collider Mask** | Enable to use the **Collider Mask** property. If disabled, then the global collision matrix will be used as is the default for all colliders. |
| **Collider Mask** | The mask used to select specific layers allowed to interact with the effector. |
| **Force Magnitude** | The magnitude of the force to be applied. |
| **Force Variation** | The variation of the magnitude of the force to be applied. |
| **Distance Scale** | The scale applied to the distance between the source and target. When calculating the distance, it is scaled by this amount allowing the effective distance to be changed which controls the magnitude of the force applied. |
| **Linear Damping** | The linear drag to apply to rigid-bodies. |
| **Angular Damping** | The angular drag to apply to rigid-bodies. |
| **Force Source** | The force source is the point that attracts or repels target objects. The distance from the target is defined from this point. The options are the following:  * **Collider**: The source point is defined as the current position of the collider. * **Rigidbody**: The source point is defined as the current position of the rigidbody. |
| **Force Target** | The force target is the point on a target object where the effector applies any force. The distance to the source is defined from this point. The options are the following:  * **Collider**: The target point is defined as the current position of the collider. Applying force here can generate torque (cause the target to rotate) if the collider isn’t positioned at the center of mass. * **Rigidbody**: The target point is defined as the current center-of-mass of the rigidbody. Applying force here will never generate torque (cause the target to rotate). |
| **Force Mode** | How the force is calculated. The options are the following:  * **Constant**: The same force is applied however far apart the source and target are. * **Inverse Linear**: The force is applied as a function of the inverse-linear distance between the source and target. When the source and target are in the same position, then the full force is applied, but it falls off linearly as they move apart. * **Inverse Squared**: The force is applied as a function of the inverse-squared distance between the source and target. When the source and target are in the same position, then the full force is applied, but it falls off squared as they move apart. This is similar to real-world gravity. |

PointEffector2D

Buoyancy Effector 2D reference

Platform Effector 2D reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/rigidbody/rigidbody-2d-simulated-property.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [Rigidbody 2D](../../2d-physics/rigidbody/rigidbody-2d-landing.html "../../2d-physics/rigidbody/rigidbody-2d-landing.html")
* Rigidbody 2D Simulated property

Static Body Type reference

Collider 2D

# Rigidbody 2D Simulated property

The Simulated property is common to all available Body Types. Use this property to start (enabled) or stop (disabled) a Rigidbody 2D and any attached Collider 2Ds and Joint 2Ds from interacting with the 2D physics simulation. Changing this property is more memory and processor efficient than enabling or disabling individual Collider 2D and Joint 2D components.

When you enable the Simulated property, the following occurs:

* The Rigidbody 2D moves via the simulation (gravity and physics forces are applied).
* Any attached Collider 2Ds continue creating new contacts and continuously reevaluate contacts.
* Any attached Joint 2Ds are simulated and constrain the attached Rigidbody 2D.
* All internal physics objects for Rigidbody 2D, Collider 2D, and Joint 2D stay in memory.

When you disable the Simulated property, the following occurs:

* The Rigidbody 2D isn’t moved by the simulation (gravity and physics forces aren’t applied).
* The Rigidbody 2D doesn’t create new contacts, and any attached Collider 2D contacts are destroyed.
* Any attached Joint 2Ds aren’t simulated, and don’t constrain any attached Rigidbody 2Ds.
* All internal physics objects for Rigidbody 2D, Collider 2D, and Joint 2D remain in memory.

## Improve efficiency with the Simulated property

You can stop and start individual elements of the 2D physics simulation by enabling and disabling physics related components individually on both Collider 2D and Joint 2D components. However, enabling and disabling individual elements of the physics simulations means internal GameObjects and physics-based components are constantly created and destroyed, which can cost high memory usage and processor power. Therefore, it’s more efficient to disable the physics simulation entirely rather than disabling the individual components.

**Note**: When you disable a Rigidbody 2D’s Simulated option, any attached Collider 2D is effectively ‘invisible’ and can’t be detected by any physics queries, such as with `Physics.Raycast`.

Static Body Type reference

Collider 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/rigidbody/rigidbody-2d-landing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* Rigidbody 2D

2D physics

Introduction to Rigidbody 2D

# Rigidbody 2D

Rigidbodies enable physics-based behavior, such as reactions to gravity, mass, drag, and momentum. A Rigidbody 2D is a 2D component you can use to enable an object to act under the control of physics.

| **Page** | **Description** |
| --- | --- |
| [Introduction to Rigidbody 2D](introduction-to-rigidbody-2d.html "introduction-to-rigidbody-2d.html") | Learn how to use Rigidbody 2D in your project and how they interact with Collider 2D components. |
| [Rigidbody 2D body types](body-types/rigidbody-2d-body-types-landing.html "body-types/rigidbody-2d-body-types-landing.html") | Choose which Body Type to use to define the behavior of the Rigidbody 2D. |
| [Rigidbody 2D Simulated property](rigidbody-2d-simulated-property.html "rigidbody-2d-simulated-property.html") | Use this property to start or stop a Rigidbody 2D and any attached Collider 2Ds and Joint 2Ds from interacting with the 2D physics simulation. |

## Additional resources

* [3D Rigidbodies](../../RigidbodiesOverview.html "../../RigidbodiesOverview.html")
* [API documentation on Rigidbody2D](../../../ScriptReference/Rigidbody2D.html "../../../ScriptReference/Rigidbody2D.html")

2D physics

Introduction to Rigidbody 2D

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/rigidbody/introduction-to-rigidbody-2d.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [2D physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")
* [Rigidbody 2D](../../2d-physics/rigidbody/rigidbody-2d-landing.html "../../2d-physics/rigidbody/rigidbody-2d-landing.html")
* Introduction to Rigidbody 2D

Rigidbody 2D

Rigidbody 2D body types

# Introduction to Rigidbody 2D

You can attach a Rigidbody 2D component to a GameObject to control it with the physics system. The Rigidbody 2D shares similar properties with its standard [Rigidbody](../../class-Rigidbody.html "../../class-Rigidbody.html")A component that allows a GameObject to be affected by simulated gravity and other forces. [More info](../../class-Rigidbody.html "../../class-Rigidbody.html")  
See in [Glossary](../../Glossary.html#Rigidbody "../../Glossary.html#Rigidbody") counterpart, but it’s adapted to 2D development. For example, GameObjects that have a Rigidbody 2D component attached to them can only move along the XY plane and can only rotate on an axis perpendicular to that plane.

## How a Rigidbody 2D works

The Unity Editor’s [Transform](../../class-Transform.html "../../class-Transform.html") component defines how to position, rotate, and scale a GameObject (and its child GameObjects) within the Scene. When you change this component, it updates other components which can affect where they render or the position of other colliders. Unity’s 2D physics system can move colliders and make them interact with each other, so Unity requires a method for the physics system to communicate this movement of colliders back to the Transform components. This movement and connection with colliders is what a Rigidbody 2D component is for. The Rigidbody 2D component overrides the Transform component and updates it to the position and/or rotation it defines instead.

**Note:** You can override the Rigidbody 2D by directly modifying the Transform component yourself (because Unity exposes all properties on all components). However, this will cause issues such as unpredictable movement or GameObjects passing through and into each other.

## Collider 2D and Rigidbody 2D interaction

Any Collider 2D component added to the same GameObject or child GameObject is implicitly attached to that Rigidbody 2D GameObject, causing the Collider 2D to move with the Rigidbody 2D. When attached, you should never move the Collider 2D directly using the Transform or any collider offset; move the Rigidbody 2D instead. Moving the Rigidbody 2D provides the best performance and ensures correct collision detection. Collider 2Ds attached to the same Rigidbody 2D won’t collide with each other. This means you can create a set of colliders that act effectively as a single compound collider, all moving and rotating in sync with the Rigidbody 2D.

Adding a Rigidbody 2D moves a sprite in a physically convincing way by applying forces from the scripting API. When you attach the appropriate collider component to the sprite GameObject, it’s affected by collisions with other moving GameObjects. Using the Unity physics system can simplify many common gameplay mechanics and portray realistic behavior with minimal coding.

**Note:** Although Rigidbody 2Ds are often described as colliding with each other, it’s the Collider 2Ds attached to each of those bodies which collide. Rigidbody 2Ds can’t collide with each other without Colliders.

## Additional resources

* [API documentation on Rigidbody2D](../../../ScriptReference/Rigidbody2D.html "../../../ScriptReference/Rigidbody2D.html")
* [API documentation on Collider2D](../../../ScriptReference/Collider2D.html "../../../ScriptReference/Collider2D.html")

Rigidbody2D

Rigidbody 2D

Rigidbody 2D body types

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/rigidbody/body-types/rigidbody-2d-body-types-landing.html

* [2D game development](../../../Unity2D.html "../../../Unity2D.html")
* [2D physics](../../../2d-physics/2d-physics.html "../../../2d-physics/2d-physics.html")
* [Rigidbody 2D](../../../2d-physics/rigidbody/rigidbody-2d-landing.html "../../../2d-physics/rigidbody/rigidbody-2d-landing.html")
* Rigidbody 2D body types

Introduction to Rigidbody 2D

Introduction to Rigidbody 2D body types

# Rigidbody 2D body types

There are three options for Body Type which define the behavior of the Rigidbody 2D. Any Collider 2D attached to that Rigidbody 2D inherits the Rigidbody 2D’s Body Type as well.

The selected Body Type defines the Rigidbody 2D’s movement behavior (position and rotation) and Collider interactions. When a Body Type changes, Unity recalculates various mass-related internal properties, and all existing contacts for the Collider 2Ds attached to the Rigidbody 2D need to be re-evaluated during the GameObject’s next FixedUpdate. Depending on how many contacts and Collider 2Ds are attached to the body, changing the Body Type can cause variations in performance.

The properties of the Rigidbody 2D component in its Inspector window differs depending on which Body Type you have selected. You can refer to the following pages for detailed information about the property settings for each Body Type:

| **Page** | **Description** |
| --- | --- |
| [Introduction to Rigidbody 2D body types](introduction-to-rigidbody-2d-body-types.html "introduction-to-rigidbody-2d-body-types.html") | Understand the concepts behind the different types of Rigidbody 2D body types. |
| [Dynamic Body Type](dynamic/dynamic-body-type-landing.html "dynamic/dynamic-body-type-landing.html") | Techniques and resources for working with a Dynamic Body Type Rigidbody 2D. |
| [Kinematic Body Type](kinematic/kinematic-body-type-landing.html "kinematic/kinematic-body-type-landing.html") | Techniques and resources for working with a Kinematic Body Type Rigidbody 2D. |
| [Static Body Type](static/static-body-type-landing.html "static/static-body-type-landing.html") | Techniques and resources for working with a Static Body Type Rigidbody 2D. |

## Additional resources

* [API documentation on Rigidbody2D](../../../../ScriptReference/Rigidbody2D.html "../../../../ScriptReference/Rigidbody2D.html")

Introduction to Rigidbody 2D

Introduction to Rigidbody 2D body types

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/rigidbody/body-types/introduction-to-rigidbody-2d-body-types.html

* [2D game development](../../../Unity2D.html "../../../Unity2D.html")
* [2D physics](../../../2d-physics/2d-physics.html "../../../2d-physics/2d-physics.html")
* [Rigidbody 2D](../../../2d-physics/rigidbody/rigidbody-2d-landing.html "../../../2d-physics/rigidbody/rigidbody-2d-landing.html")
* [Rigidbody 2D body types](../../../2d-physics/rigidbody/body-types/rigidbody-2d-body-types-landing.html "../../../2d-physics/rigidbody/body-types/rigidbody-2d-body-types-landing.html")
* Introduction to Rigidbody 2D body types

Rigidbody 2D body types

Dynamic Body Type

# Introduction to Rigidbody 2D body types

There are three options for Body Type which define the behavior of the Rigidbody 2D. Any Collider 2D attached to that Rigidbody 2D inherits the Rigidbody 2D’s Body Type as well.

The selected Body Type defines the Rigidbody 2D’s movement behavior (position and rotation) and Collider interactions. When a Body Type changes, Unity recalculates various mass-related internal properties, and all existing contacts for the Collider 2Ds attached to the Rigidbody 2D need to be re-evaluated during the GameObject’s next FixedUpdate. Depending on how many contacts and Collider 2Ds are attached to the body, changing the Body Type can cause variations in performance.

The properties of the Rigidbody 2D component in its Inspector window differs depending on which Body Type you have selected.

Rigidbody 2D body types

Dynamic Body Type

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/rigidbody/body-types/dynamic/dynamic-body-type-reference.html

* [2D game development](../../../../Unity2D.html "../../../../Unity2D.html")
* [2D physics](../../../../2d-physics/2d-physics.html "../../../../2d-physics/2d-physics.html")
* [Rigidbody 2D](../../../../2d-physics/rigidbody/rigidbody-2d-landing.html "../../../../2d-physics/rigidbody/rigidbody-2d-landing.html")
* [Rigidbody 2D body types](../../../../2d-physics/rigidbody/body-types/rigidbody-2d-body-types-landing.html "../../../../2d-physics/rigidbody/body-types/rigidbody-2d-body-types-landing.html")
* [Dynamic Body Type](../../../../2d-physics/rigidbody/body-types/dynamic/dynamic-body-type-landing.html "../../../../2d-physics/rigidbody/body-types/dynamic/dynamic-body-type-landing.html")
* Dynamic Body Type

Dynamic Body Type fundamentals

Kinematic Body Type

# Dynamic Body Type

The Dynamic Body Type is the most common body type for Rigidbody 2D.

## Dynamic Rigidbody 2D properties

| **Property** | **Function** |
| --- | --- |
| **Body Type** | Select to set the movement behavior and Collider 2D interaction of this Rigidbody 2D’s component settings. |
| **Dynamic** | Select to set this Rigidbody 2D to the Dynamic Body Type, which is designed to move under simulation and has all Rigidbody 2D properties available. The is the default Body Type for a Rigidbody 2D. |
| **Kinematic** | Select to set this Rigidbody 2D to the [Kinematic](../kinematic/kinematic-body-type-reference.html "../kinematic/kinematic-body-type-reference.html") Body Type, which is designed to move under simulation but only under very explicit user control. Refer to [Body Type: Kinematic](../kinematic/kinematic-body-type-reference.html "../kinematic/kinematic-body-type-reference.html") for more information. |
| **Static** | Select to set this Rigidbody 2D to the [Static](../static/static-body-type-reference.html "../static/static-body-type-reference.html") Body Type, which is designed to not move under simulation at all and behaves like an immovable object with infinite mass. Refer to [Body Type: Static](../static/static-body-type-reference.html "../static/static-body-type-reference.html") for more information. |
| **Material** | Set a common [physics material](../../../physics-material-2d-reference.html "../../../physics-material-2d-reference.html")A physics asset for adjusting the friction and bouncing effects of colliding objects. [More info](../../../../class-PhysicsMaterial.html "../../../../class-PhysicsMaterial.html") See in [Glossary](../../../../Glossary.html#PhysicsMaterial "../../../../Glossary.html#PhysicsMaterial") for all Collider 2Ds attached to this Rigidbody 2D. **Note:** A Collider 2D uses its own Material property if it has one set. If there is no Material specified here or in the Collider 2D, the default option is **None (Physics Material 2D)**. This uses a default Material which you can set in the [Physics 2D](../../../../class-Physics2DSettings.html "../../../../class-Physics2DSettings.html") window. |
| **Simulated** | Enable **Simulated** to have the Rigidbody 2D and any attached Collider 2Ds and Joint 2Ds to interact with the physics simulation during runtime. If this is disabled, these components do not interact with the simulation. Refer to [Rigidbody 2D properties: Simulated](../../rigidbody-2d-simulated-property.html "../../rigidbody-2d-simulated-property.html") for more information. This property is enabled by default. |
| **Use Auto Mass** | Enable this property to have the Rigidbody 2D automatically detect the GameObject’s mass from its Collider 2D. |
| **Mass** | Define the mass of the Rigidbody 2D. This is grayed out if you have enabled **Use Auto Mass**. |
| **Linear Damping** | Set the drag coefficient affecting positional movement. |
| **Angular Damping** | Set the drag coefficient affecting rotational movement. |
| **Gravity Scale** | Define the degree to which the GameObject is affected by gravity. |
| **Collision Detection** | Define how collisions between Collider 2Ds are detected. |
| **Discrete** | Select this option to allow GameObjects with Rigidbody 2Ds and Collider 2Ds to overlap or pass through each other during a physics update, if they are moving fast enough. Collision contacts are only generated at the new position. |
| **Continuous** | Select this option to ensure GameObjects with Rigidbody 2Ds and Collider 2Ds do not pass through each other during a physics update. Instead, Unity calculates the first impact point of any of the Collider 2Ds, and moves the GameObject there. **Note:** This option takes more CPU time than **Discrete**. |
| **Sleeping Mode** | Define how the GameObject “sleeps” to save processor time when it is at rest. |
| **Never Sleep** | Select this option to have sleeping disabled. **Important:** This should be avoided where possible, as it can impact system resources. |
| **Start Awake** | Select this to have the GameObject initially awake. |
| **Start Asleep** | Select this to have the GameObject initially asleep but can be awaken by collisions. |
| **Interpolate** | Define how the GameObject’s movement is interpolated between physics updates. **Tip:** This is useful when motion tends to be jerky. |
| **None** | Select this to not apply movement smoothing. |
| **Interpolate** | Select this to smooth movement based on the GameObject’s positions in previous frames. |
| **Extrapolate** | Select this to smooth movement based on an estimate of the GameObject’s position in the next frame. |
| **Constraints** | Define any restrictions on the Rigidbody 2D’s motion. |
| **Freeze Position** | Stops the Rigidbody 2D moving in the X and Y world axes selectively. |
| **Freeze Rotation** | Stops the Rigidbody 2D rotating around the Z world axis selectively. |
| **Layer Overrides** | Expand for the Layer override settings. |
| **Include Layers** | Select the additional Layers that all Collider 2Ds attached to this Rigidbody 2D should include, when deciding if a collision with another Collider2D should occur or not. Refer to [Rigidbody2D-includeLayers](../../../../../ScriptReference/Rigidbody2D-includeLayers.html "../../../../../ScriptReference/Rigidbody2D-includeLayers.html") for more information. |
| **Exclude Layers** | Select the additional Layers that all Collider 2Ds attached to this Rigidbody 2D should exclude, when deciding if a collision with another Collider 2D should occur or not. Refer to [Rigidbody2D-excludeLayers](../../../../../ScriptReference/Rigidbody2D-excludeLayers.html "../../../../../ScriptReference/Rigidbody2D-excludeLayers.html") for more information. |

**Note**: Do not use the Transform component to set the position or rotation of a **Dynamic** Rigidbody 2D. The simulation repositions a **Dynamic** Rigidbody 2D according to its velocity; you can change this directly via forces applied to it by scripts, or indirectly via collisions and gravity.

Dynamic Body Type fundamentals

Kinematic Body Type

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/rigidbody/body-types/dynamic/dynamic-body-type-fundamentals.html

* [2D game development](../../../../Unity2D.html "../../../../Unity2D.html")
* [2D physics](../../../../2d-physics/2d-physics.html "../../../../2d-physics/2d-physics.html")
* [Rigidbody 2D](../../../../2d-physics/rigidbody/rigidbody-2d-landing.html "../../../../2d-physics/rigidbody/rigidbody-2d-landing.html")
* [Rigidbody 2D body types](../../../../2d-physics/rigidbody/body-types/rigidbody-2d-body-types-landing.html "../../../../2d-physics/rigidbody/body-types/rigidbody-2d-body-types-landing.html")
* [Dynamic Body Type](../../../../2d-physics/rigidbody/body-types/dynamic/dynamic-body-type-landing.html "../../../../2d-physics/rigidbody/body-types/dynamic/dynamic-body-type-landing.html")
* Dynamic Body Type fundamentals

Dynamic Body Type

Dynamic Body Type

# Dynamic Body Type fundamentals

The **Dynamic** Body Type is the default Body Type for a Rigidbody 2D, because it is the most common Body Type for things that need to move and is designed to move under simulation. All Rigidbody 2D properties are available with this Body Type, such as finite mass and drag, and is affected by gravity and forces. A Dynamic body will collide with every other Body Type, and is the most interactive of Body Types. It’s also the most performance-expensive Body Type, because of its dynamic nature and interactivity with everything around it.

Dynamic Body Type

Dynamic Body Type

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/rigidbody/body-types/dynamic/dynamic-body-type-landing.html

* [2D game development](../../../../Unity2D.html "../../../../Unity2D.html")
* [2D physics](../../../../2d-physics/2d-physics.html "../../../../2d-physics/2d-physics.html")
* [Rigidbody 2D](../../../../2d-physics/rigidbody/rigidbody-2d-landing.html "../../../../2d-physics/rigidbody/rigidbody-2d-landing.html")
* [Rigidbody 2D body types](../../../../2d-physics/rigidbody/body-types/rigidbody-2d-body-types-landing.html "../../../../2d-physics/rigidbody/body-types/rigidbody-2d-body-types-landing.html")
* Dynamic Body Type

Introduction to Rigidbody 2D body types

Dynamic Body Type fundamentals

# Dynamic Body Type

Techniques and resources for working with a Dynamic Body Type Rigidbody 2D.

| **Page** | **Description** |
| --- | --- |
| [Dynamic Body Type fundamentals](dynamic-body-type-fundamentals.html "dynamic-body-type-fundamentals.html") | Understand the Dynamic Body Type to make a Rigidbody 2D to move under simulation. |
| [Dynamic Body Type reference](dynamic-body-type-reference.html "dynamic-body-type-reference.html") | Explore the properties of the Dynamic Body Type. |

Introduction to Rigidbody 2D body types

Dynamic Body Type fundamentals

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/rigidbody/body-types/static/static-body-type-fundamentals.html

* [2D game development](../../../../Unity2D.html "../../../../Unity2D.html")
* [2D physics](../../../../2d-physics/2d-physics.html "../../../../2d-physics/2d-physics.html")
* [Rigidbody 2D](../../../../2d-physics/rigidbody/rigidbody-2d-landing.html "../../../../2d-physics/rigidbody/rigidbody-2d-landing.html")
* [Rigidbody 2D body types](../../../../2d-physics/rigidbody/body-types/rigidbody-2d-body-types-landing.html "../../../../2d-physics/rigidbody/body-types/rigidbody-2d-body-types-landing.html")
* [Static Body Type](../../../../2d-physics/rigidbody/body-types/static/static-body-type-landing.html "../../../../2d-physics/rigidbody/body-types/static/static-body-type-landing.html")
* Static Body Type fundamentals

Static Body Type

Static Body Type reference

# Static Body Type fundamentals

A Static Rigidbody 2D is designed to not move under simulation at all. If anything collides with it, a Static Rigidbody 2D behaves like an immovable object (as though it has infinite mass). It is also the least resource intensive **Body Type**. A Static body only collides with Dynamic Rigidbody 2Ds.

**Note**: Having two Static Rigidbody 2Ds collide is not supported, since they are not designed to move.

## Use a large number of Static Collider 2D

Aside from setting the Rigidbody 2D to the **Static** Body Type, there is another scenario where a Static Rigidbody 2D is created. This is when a GameObject with a Collider 2D component does not have a Rigidbody 2D component at all. All Collider 2Ds without a Rigidbody 2D component are internally considered to be attached to a single hidden **Static** Rigidbody 2D component.

This means that you are able to create a large number of Static Collider 2Ds as you do not have to add a Rigidbody 2D component for each individual GameObject. Both methods of creating Static Collider 2Ds have their advantages, depending on the scenario.

If an individual Static Collider 2D needs to be moved or reconfigured at runtime, then add a Rigidbody 2D component and set it to the **Static** Body Type, as it is faster to simulate the Collider 2D when it has its own Rigidbody 2D. If a group of Collider 2Ds needs to be moved or reconfigured at runtime, it is faster to have them all be children of the single hidden parent Rigidbody 2D than to move each GameObject individually.

**Note**: As stated above, Static Rigidbody 2Ds are designed not to move, and collisions between two Static Rigidbody 2D objects that intersect are not registered. However, Static Rigidbody 2Ds and Kinematic Rigidbody 2Ds will interact with each other if one of their Collider 2Ds is set to be a **trigger**. There is also a feature that changes what a Kinematic body will interact with (see [Use Full Kinematic Contacts](../kinematic/kinematic-body-type-reference.html "../kinematic/kinematic-body-type-reference.html") for more information).

Static Body Type

Static Body Type reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/rigidbody/body-types/static/static-body-type-landing.html

* [2D game development](../../../../Unity2D.html "../../../../Unity2D.html")
* [2D physics](../../../../2d-physics/2d-physics.html "../../../../2d-physics/2d-physics.html")
* [Rigidbody 2D](../../../../2d-physics/rigidbody/rigidbody-2d-landing.html "../../../../2d-physics/rigidbody/rigidbody-2d-landing.html")
* [Rigidbody 2D body types](../../../../2d-physics/rigidbody/body-types/rigidbody-2d-body-types-landing.html "../../../../2d-physics/rigidbody/body-types/rigidbody-2d-body-types-landing.html")
* Static Body Type

Kinematic Body Type reference

Static Body Type fundamentals

# Static Body Type

Techniques and resources for working with a Static Body Type Rigidbody 2D.

| **Page** | **Description** |
| --- | --- |
| [Static Body Type fundamentals](static-body-type-fundamentals.html "static-body-type-fundamentals.html") | Explore the properties of the Static Body Type to make a Rigidbody 2D to not move under simulation. |
| [Static Body Type reference](static-body-type-reference.html "static-body-type-reference.html") | Explore the properties of the Static Body Type. |

Kinematic Body Type reference

Static Body Type fundamentals

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/rigidbody/body-types/static/static-body-type-reference.html

* [2D game development](../../../../Unity2D.html "../../../../Unity2D.html")
* [2D physics](../../../../2d-physics/2d-physics.html "../../../../2d-physics/2d-physics.html")
* [Rigidbody 2D](../../../../2d-physics/rigidbody/rigidbody-2d-landing.html "../../../../2d-physics/rigidbody/rigidbody-2d-landing.html")
* [Rigidbody 2D body types](../../../../2d-physics/rigidbody/body-types/rigidbody-2d-body-types-landing.html "../../../../2d-physics/rigidbody/body-types/rigidbody-2d-body-types-landing.html")
* [Static Body Type](../../../../2d-physics/rigidbody/body-types/static/static-body-type-landing.html "../../../../2d-physics/rigidbody/body-types/static/static-body-type-landing.html")
* Static Body Type reference

Static Body Type fundamentals

Rigidbody 2D Simulated property

# Static Body Type reference

Due to limited behavior, Rigidbody 2D with a Static body type only have a very limited set of properties are available for this **Body Type**.

## Static Rigidbody 2D properties

| **Property** | **Function** |
| --- | --- |
| **Body Type** | Select to set the movement behavior and Collider 2D interaction of this Rigidbody 2D’s component settings. |
| **Dynamic** | Select to set this Rigidbody 2D to the [Dynamic](../dynamic/dynamic-body-type-reference.html "../dynamic/dynamic-body-type-reference.html") Body Type, which is designed to move under simulation and has all Rigidbody 2D properties available. The is the default Body Type for a Rigidbody 2D. |
| **Kinematic** | Select to set this Rigidbody 2D to the [Kinematic](../kinematic/kinematic-body-type-reference.html "../kinematic/kinematic-body-type-reference.html") Body Type, which is designed to move under simulation but only under very explicit user control. Refer to [Body Type: Kinematic](../kinematic/kinematic-body-type-reference.html "../kinematic/kinematic-body-type-reference.html") for more information. |
| **Static** | Select to set this Rigidbody 2D to the Static Body Type, which is designed to not move under simulation at all and behaves like an immovable object with infinite mass. |
| **Material** | Set a common [physics material](../../../physics-material-2d-reference.html "../../../physics-material-2d-reference.html")A physics asset for adjusting the friction and bouncing effects of colliding objects. [More info](../../../../class-PhysicsMaterial.html "../../../../class-PhysicsMaterial.html") See in [Glossary](../../../../Glossary.html#PhysicsMaterial "../../../../Glossary.html#PhysicsMaterial") for all Collider 2Ds attached to this Rigidbody 2D. **Note:** A Collider 2D uses its own Material property if it has one set. If there is no Material specified here or in the Collider 2D, the default option is **None (Physics Material 2D)**. This uses a default Material which you can set in the [Physics 2D](../../../../class-Physics2DSettings.html "../../../../class-Physics2DSettings.html") window.    **Note**: Use this to ensure that all Collider 2Ds attached to the same **Static** Body Type Rigidbody 2D can all use the same Material. |
| **Simulated** | Enable **Simulated** to have the Rigidbody 2D and any attached Collider 2Ds and Joint 2Ds to interact with the physics simulation during runtime. If this is disabled, these components do not interact with the simulation. Refer to [Rigidbody 2D properties: Simulated](../../rigidbody-2d-simulated-property.html "../../rigidbody-2d-simulated-property.html") for more information. This property is enabled by default. |
| **Layer Overrides** | Expand for the Layer override settings. |
| **Include Layers** | Select the additional Layers that all Collider 2Ds attached to this Rigidbody 2D should include, when deciding if a collision with another Collider2D should occur or not. Refer to [Rigidbody2D-includeLayers](../../../../../ScriptReference/Rigidbody2D-includeLayers.html "../../../../../ScriptReference/Rigidbody2D-includeLayers.html") for more information. |
| **Exclude Layers** | Select the additional Layers that all Collider 2Ds attached to this Rigidbody 2D should exclude, when deciding if a collision with another Collider 2D should occur or not. Refer to [Rigidbody2D-excludeLayers](../../../../../ScriptReference/Rigidbody2D-excludeLayers.html "../../../../../ScriptReference/Rigidbody2D-excludeLayers.html") for more information. |

Static Body Type fundamentals

Rigidbody 2D Simulated property

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/rigidbody/body-types/kinematic/kinematic-body-type-fundamentals.html

* [2D game development](../../../../Unity2D.html "../../../../Unity2D.html")
* [2D physics](../../../../2d-physics/2d-physics.html "../../../../2d-physics/2d-physics.html")
* [Rigidbody 2D](../../../../2d-physics/rigidbody/rigidbody-2d-landing.html "../../../../2d-physics/rigidbody/rigidbody-2d-landing.html")
* [Rigidbody 2D body types](../../../../2d-physics/rigidbody/body-types/rigidbody-2d-body-types-landing.html "../../../../2d-physics/rigidbody/body-types/rigidbody-2d-body-types-landing.html")
* [Kinematic Body Type](../../../../2d-physics/rigidbody/body-types/kinematic/kinematic-body-type-landing.html "../../../../2d-physics/rigidbody/body-types/kinematic/kinematic-body-type-landing.html")
* Kinematic Body Type fundamentals

Kinematic Body Type

Kinematic Body Type reference

# Kinematic Body Type fundamentals

The Kinematic **Body Type** Rigidbody 2D is designed to move under simulation, but only under very explicit user control. While a [Dynamic](../dynamic/dynamic-body-type-reference.html "../dynamic/dynamic-body-type-reference.html") Rigidbody 2D is affected by gravity and forces, a Kinematic Rigidbody 2D is not. Because of this, the Kinematic Rigidbody 2D has a lower demand on system resources than a Dynamic Rigidbody 2D, allowing it to be simulated faster.

To reposition a Kinematic Rigidbody 2D, it must be repositioned explicitly via [Rigidbody2D.MovePosition](../../../../../ScriptReference/Rigidbody2D.MovePosition.html "../../../../../ScriptReference/Rigidbody2D.MovePosition.html") or [Rigidbody2D.MoveRotation](../../../../../ScriptReference/Rigidbody2D.MoveRotation.html "../../../../../ScriptReference/Rigidbody2D.MoveRotation.html"). Use physics queries to detect collisions, and scripts to decide where and how the Rigidbody 2D should move.

A Kinematic Rigidbody 2D can still move via its velocity, but the velocity is not affected by forces or gravity. A Kinematic Rigidbody 2D does not collide with other Kinematic Rigidbody 2Ds or with Static Rigidbody 2Ds and will only collide with Dynamic Rigidbody 2Ds.

Kinematic Body Type

Kinematic Body Type reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/rigidbody/body-types/kinematic/kinematic-body-type-landing.html

* [2D game development](../../../../Unity2D.html "../../../../Unity2D.html")
* [2D physics](../../../../2d-physics/2d-physics.html "../../../../2d-physics/2d-physics.html")
* [Rigidbody 2D](../../../../2d-physics/rigidbody/rigidbody-2d-landing.html "../../../../2d-physics/rigidbody/rigidbody-2d-landing.html")
* [Rigidbody 2D body types](../../../../2d-physics/rigidbody/body-types/rigidbody-2d-body-types-landing.html "../../../../2d-physics/rigidbody/body-types/rigidbody-2d-body-types-landing.html")
* Kinematic Body Type

Dynamic Body Type

Kinematic Body Type fundamentals

# Kinematic Body Type

Techniques and resources for working with a Kinematic Body Type Rigidbody 2D.

| **Page** | **Description** |
| --- | --- |
| [Kinematic Body Type fundamentals](kinematic-body-type-fundamentals.html "kinematic-body-type-fundamentals.html") | Explore the properties of the Kinematic Body Type to make a Rigidbody 2D to move under simulation only with explicit user control. |
| [Kinematic Body Type reference](kinematic-body-type-reference.html "kinematic-body-type-reference.html") | Explore the properties of the Kinematic Body Type. |

Dynamic Body Type

Kinematic Body Type fundamentals

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics/rigidbody/body-types/kinematic/kinematic-body-type-reference.html

* [2D game development](../../../../Unity2D.html "../../../../Unity2D.html")
* [2D physics](../../../../2d-physics/2d-physics.html "../../../../2d-physics/2d-physics.html")
* [Rigidbody 2D](../../../../2d-physics/rigidbody/rigidbody-2d-landing.html "../../../../2d-physics/rigidbody/rigidbody-2d-landing.html")
* [Rigidbody 2D body types](../../../../2d-physics/rigidbody/body-types/rigidbody-2d-body-types-landing.html "../../../../2d-physics/rigidbody/body-types/rigidbody-2d-body-types-landing.html")
* [Kinematic Body Type](../../../../2d-physics/rigidbody/body-types/kinematic/kinematic-body-type-landing.html "../../../../2d-physics/rigidbody/body-types/kinematic/kinematic-body-type-landing.html")
* Kinematic Body Type reference

Kinematic Body Type fundamentals

Static Body Type

# Kinematic Body Type reference

A Kinematic Rigidbody 2D behaves like an immovable object (as if it has infinite mass) during collisions, and mass-related properties are not available with this Body Type.

## Kinematic Rigidbody 2D properties

| **Property** | **Function** |
| --- | --- |
| **Body Type** | Select to set the movement behavior and Collider 2D interaction of this Rigidbody 2D’s component settings. |
| **Dynamic** | Select to set this Rigidbody 2D to the [Dynamic](../dynamic/dynamic-body-type-reference.html "../dynamic/dynamic-body-type-reference.html") Body Type, which is designed to move under simulation and has all Rigidbody 2D properties available. This is the default Body Type for a Rigidbody 2D. |
| **Kinematic** | Select to set this Rigidbody 2D to the Kinematic Body Type, which is designed to move under simulation but only under very explicit user control. |
| **Static** | Select to set this Rigidbody 2D to the [Static](../static/static-body-type-reference.html "../static/static-body-type-reference.html") Body Type, which is designed to not move under simulation at all and behaves like an immovable object with infinite mass. Refer to [Body Type: Static](../static/static-body-type-reference.html "../static/static-body-type-reference.html") for more information. |
| **Material** | Set a common [physics material](../../../physics-material-2d-reference.html "../../../physics-material-2d-reference.html")A physics asset for adjusting the friction and bouncing effects of colliding objects. [More info](../../../../class-PhysicsMaterial.html "../../../../class-PhysicsMaterial.html") See in [Glossary](../../../../Glossary.html#PhysicsMaterial "../../../../Glossary.html#PhysicsMaterial") for all Collider 2Ds attached to this Rigidbody 2D. **Note:** A Collider 2D uses its own Material property if it has one set. If there is no Material specified here or in the Collider 2D, the default option is **None (Physics Material 2D)**. This uses a default Material which you can set in the [Physics 2D](../../../../class-Physics2DSettings.html "../../../../class-Physics2DSettings.html") window. |
| **Simulated** | Enable **Simulated** to have the Rigidbody 2D and any attached Collider 2Ds and Joint 2Ds to interact with the physics simulation during runtime. If this is disabled, these components do not interact with the simulation. Refer to [Rigidbody 2D properties: Simulated](../../rigidbody-2d-simulated-property.html "../../rigidbody-2d-simulated-property.html"), below for more information. This property is enabled by default. |
| **Full Kinematic Contact** | Enable this property if you want the Rigidbody 2D to be able to collide with all other Rigidbody 2D **Body Types**. **Note**: When this property is disabled, the Kinematic Rigidbody 2D only collides with Dynamic Rigidbody 2Ds. See [Using Full Kinematic Contacts](#kinematiccontact "#kinematiccontact") for more details. |
| **Collision Detection** | Define how collisions between Collider 2Ds are detected. |
| **Discrete** | Select this option to allow GameObjects with Rigidbody 2Ds and Collider 2Ds to overlap or pass through each other during a physics update, if they are moving fast enough. Collision contacts are only generated at the new position. |
| **Continuous** | Select this option to ensure GameObjects with Rigidbody 2Ds and Collider 2Ds do not pass through each other during a physics update. Instead, Unity calculates the first impact point of any of the Collider 2Ds, and moves the GameObject there. **Note:** This option takes more CPU time than **Discrete**. |
| **Sleeping Mode** | Define how the GameObject “sleeps” to save processor time when it is at rest. |
| **Never Sleep** | Select this option to have sleeping disabled. **Important:** This should be avoided where possible, as it can impact system resources. |
| **Start Awake** | Select this to have the GameObject initially awake. |
| **Start Asleep** | Select this to have the GameObject initially asleep but can be awaken by collisions. |
| **Interpolate** | Define how the GameObject’s movement is interpolated between physics updates. **Note**: This is useful when motion tends to be jerky. |
| **None** | Select this to not apply movement smoothing. |
| **Interpolate** | Select this to smoothen movement based on the GameObject’s positions in previous frames. |
| **Extrapolate** | Select this to smoothen movement is smoothed based on an estimate of its position in the next frame. |
| **Constraints** | Define any restrictions on the Rigidbody 2D’s motion. |
| **Freeze Position** | Stops the Rigidbody 2D moving in the X and Y world axes selectively. |
| **Freeze Rotation** | Stops the Rigidbody 2D rotating around the Z world axis selectively. |
| **Layer Overrides** | Expand for the Layer override settings. |
| **Include Layers** | Select the additional Layers that all Collider 2Ds attached to this Rigidbody 2D should include, when deciding if a collision with another Collider2D should occur or not. Refer to [Rigidbody2D-includeLayers](../../../../../ScriptReference/Rigidbody2D-includeLayers.html "../../../../../ScriptReference/Rigidbody2D-includeLayers.html") for more information. |
| **Exclude Layers** | Select the additional Layers that all Collider 2Ds attached to this Rigidbody 2D should exclude, when deciding if a collision with another Collider 2D should occur or not. Refer to [Rigidbody2D-excludeLayers](../../../../../ScriptReference/Rigidbody2D-excludeLayers.html "../../../../../ScriptReference/Rigidbody2D-excludeLayers.html") for more information. |

## Full Kinematic Contacts

Enabling **Full Kinematic Contacts** enables a Kinematic Rigidbody 2D to collide with all Rigidbody 2D **Body Types**. This is similar to the behavior of a Dynamic Rigidbody 2D, except the Kinematic Rigidbody 2D is not moved by the physics system when contacting another Rigidbody 2D. Instead, it behaves like an immovable object with infinite mass.

When this property is disabled, a Kinematic Rigidbody 2D will only collide with Dynamic Rigidbody 2Ds and not the other **Body Types**. **Note**: Trigger Colliders are an exception to this rule. This means that no collision scripting callbacks ([OnCollisionEnter](../../../../../ScriptReference/Collider2D.OnCollisionEnter2D.html "../../../../../ScriptReference/Collider2D.OnCollisionEnter2D.html"), [OnCollisionStay](../../../../../ScriptReference/Collider2D.OnCollisionStay2D.html "../../../../../ScriptReference/Collider2D.OnCollisionStay2D.html"), [OnCollisionExit](../../../../../ScriptReference/Collider2D.OnCollisionExit2D.html "../../../../../ScriptReference/Collider2D.OnCollisionExit2D.html")) will occur.

This can be inconvenient when you are using physics queries (such as [Physics.Raycast](../../../../../ScriptReference/Physics.Raycast.html "../../../../../ScriptReference/Physics.Raycast.html")) to detect where and how a Rigidbody 2D should move, and when you require multiple Kinematic Rigidbody 2Ds to interact with each other. Enable **Use Full Kinematic Contacts** to make Kinematic Rigidbody 2D components interact in this way.

**Note**: **Use Full Kinematic Contacts** allows explicit position and rotation control of a Kinematic Rigidbody 2D, but still allows full collision callbacks. In a setup where you need explicit control of all Rigidbody 2Ds, use Kinematic Rigidbody 2Ds in place of Dynamic Rigidbody 2Ds to still have full collision callback support.

Kinematic Body Type fundamentals

Static Body Type

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/profiler-2d.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [Sprites](../sprite/sprite-landing.html "../sprite/sprite-landing.html")
* 2D Profiler module reference

Secondary Textures tab reference for the Sprite Editor window

Tilemaps

# 2D Profiler module reference

The 2D module in the [Profiler window](../profiler-introduction.html "../profiler-introduction.html") displays statistics about how many sprites Unity renders and which [sprite atlases](atlas/create-sprite-atlas.html "atlas/create-sprite-atlas.html") it uses.

To open the Profiler module, follow these steps:

1. From the main menu select **Window** > **Analysis** > **Profiler**.
2. Select the **Profiler Modules** dropdown, then enable **2D**.

## Chart categories

The chart in the 2D module displays the following categories.

| **Chart** | **Description** |
| --- | --- |
| **Sprite Count** | The number of sprites Unity loads in the selected frame, including culled sprites. |
| **SpriteAtlas Count** | The number of sprite atlases Unity loads in the selected frame, whether Unity uses them or not. |
| **Sprites rendered** | The number of sprites Unity renders in the selected frame, excluding culled sprites. |
| **SpriteAtlases rendered** | The number of sprite atlases Unity uses in the selected frame. |

## Module details pane

The details pane of the 2D module displays the following properties.

| **Property** | **Description** |
| --- | --- |
| **Name** | The name of the sprite atlas (), sprite (), or texture () Unity renders. |
| **Sprites** | The number of sprites Unity renders, excluding culled sprites. This property is displayed only if the item is a sprite atlas or a texture. |
| **Textures** | The number of textures in the sprite atlas, also known as pages. This property is displayed only if the item is a sprite atlas. |
| **Usage** | The percentage of the sprite atlas or texture Unity uses for rendering. A low percentage indicates wasted texture space. For more information, refer to [Create a sprite atlas](atlas/create-sprite-atlas.html "atlas/create-sprite-atlas.html"), and [Get started with the Sprite Atlas Analyzer](https://docs.unity3d.com/Packages/com.unity.2d.tooling@latest/index.html?subfolder=/manual/GetStarted-sprite-atlas-analyzer.html "https://docs.unity3d.com/Packages/com.unity.2d.tooling@latest/index.html?subfolder=/manual/GetStarted-sprite-atlas-analyzer.html") in the 2D Tooling package. |

## Additional resources

* [Unity Profiler](../Profiler.html "../Profiler.html")
* [CPU Usage Profiler module](../ProfilerCPU.html "../ProfilerCPU.html")

Secondary Textures tab reference for the Sprite Editor window

Tilemaps

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/create-collision-geometry.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [Sprites](../sprite/sprite-landing.html "../sprite/sprite-landing.html")
* Create collision shapes for a sprite

Crop a sprite

Sorting sprites

# Create collision shapes for a sprite

In a 2D project, Unity uses collision geometry to determine if a sprite collides with other sprites. Collision geometry can be one shape, for example a circle around the sprite, or a set of multiple shapes.

You can do either of the following:

* Generate collision geometry automatically.
* Create default custom collision geometry for all instances of a sprite.

## Generate collision geometry automatically

Follow these steps:

1. From the **Project** window, drag the sprite asset () into the scene.
2. In the **Inspector** window of the sprite GameObject, select **Add Component**.
3. Select **Physics 2D**, then a [**Collider 2D**](../2d-physics/collider/collider-2d-landing.html "../2d-physics/collider/collider-2d-landing.html") component.

If you select **Polygon Collider 2D**, by default Unity tries to create collision geometry that encompasses the opaque parts of the sprite.

Unity displays the collision geometry as a green outline in the Scene view. To edit the collision geometry, refer to the [Edit the collision geometry for one instance](#edit-the-collision-shape-for-one-instance "#edit-the-collision-shape-for-one-instance") section.

## Create default collision geometry for all instances of a sprite

To create custom collision geometry that Unity uses every time you create an instance of a sprite, use the **Custom Physics Shape** tab of the **Sprite Editor** window and a **Polygon Collider 2D** component.

Follow these steps:

1. In the **Hierarchy** window, select the sprite GameObject.
2. In the **Inspector** window, in the **Sprite Renderer** component, select **Open Sprite Editor**.
3. Select the **Custom Physics Shape** tab in the top-left dropdown. Unity displays the **Outline Tools** overlay.
4. Select **Generate** to automatically generate an outline that follows the opaque parts of the sprite. Unity displays the outline in white. Each point is a vertex of a collision shape.

   You can also create one or more outlines manually by clicking the sprite then dragging a rectangle.
5. Edit the geometry if you need to. For more information, refer to [Custom Physics Shape tab reference for the Sprite Editor window](sprite-editor/custom-physics-shape-editor-reference.html "sprite-editor/custom-physics-shape-editor-reference.html").

   To change how closely the geometry follows the opaque parts of the sprite, adjust the **Outline Detail** and **Alpha Tolerance** properties, then regenerate the outline.
6. To save the geometry, select **Apply** in the toolbar.
7. Add the sprite to the scene.
8. In the **Inspector** window of the sprite GameObject, select **Add Component**, then **Physics 2D** > **Polygon Collider 2D**.

![Left: Automatically generated geometry with a low Outline Detail value. Right: Automatically generated geometry with a higher Outline Detail value.](../../uploads/Main/2DCustomOutline_7.png)


Left: Automatically generated geometry with a low **Outline Detail** value. Right: Automatically generated geometry with a higher **Outline Detail** value.

Unity now uses the collision geometry for all new instances of the sprite if you add a **Polygon Collider 2D** component.

**Note:** Unity doesn’t automatically update existing GameObjects with the collision geometry. To update an existing **Polygon Collider 2D** component, right-click the title of the collider component in the **Inspector** window, then select **Reset**.

For more information, refer to [Custom Physics Shape tab reference for the Sprite Editor window](sprite-editor/custom-physics-shape-editor-reference.html "sprite-editor/custom-physics-shape-editor-reference.html").

## Edit the collision geometry for one instance of a sprite

To edit the auto-generated collision geometry of a single sprite instance, or override the collision geometry from the **Custom Physics Shape** tab, use the **Edit Collider** ![](../../uploads/Main/edit-collider-inspector-icon.png) button.

Follow these steps:

1. In the **Hierarchy** window, select the sprite GameObject.
2. Select **Edit Collider** (![](../../uploads/Main/edit-collider-inspector-icon.png)). The **Edit Collider** button is also available in the [Tools overlay](../default-overlays-reference.html "../default-overlays-reference.html") of the Scene view.

To edit the geometry, do the following:

* To move a point, select and drag it.
* To add a point, click on an edge.
* To remove a point, hold Ctrl (macOS: Cmd) while hovering over an edge, then select a red edge.
* To exit the editing mode, select **Edit Collider** again.

**Note:** Editing the collision geometry of a single instance doesn’t change the collision geometry in the **Custom Physics Shape** tab of the **Sprite Editor** window.

## Additional resources

* [Sprite Editor window reference](sprite-editor/sprite-editor-window-reference-landing.html "sprite-editor/sprite-editor-window-reference-landing.html")

Crop a sprite

Sorting sprites

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/sprite-landing.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* Sprites

Convert 2D assets from the Built-In Render Pipeline to URP

Add placeholder sprites

# Sprites

Sprites are a type of 2D [asset](../AssetWorkflow.html "../AssetWorkflow.html")Any media or data that can be used in your game or project. An asset may come from a file created outside of Unity, such as a 3D Model, an audio file or an image. You can also create some asset types in Unity, such as an Animator Controller, an Audio Mixer or a Render Texture. [More info](../AssetWorkflow.html "../AssetWorkflow.html")  
See in [Glossary](../Glossary.html#asset "../Glossary.html#asset") you can use in your Unity project. Use this section to learn how to set up your sprites and manage them with different components.

If you’re used to working in 3D, sprites are similar to standard textures, but there are special techniques to combine and manage sprite textures for efficiency during development.

**Note:** To use sprites, make sure the 2D Sprite package is installed in your project. For more information, refer to [set up your project for 2D games](../setup-project-2d-game.html "../setup-project-2d-game.html").

| **Topic** | **Description** |
| --- | --- |
| [Add placeholder sprites](placeholder/placeholder-landing.html "placeholder/placeholder-landing.html") | To quickly test sprites, create temporary placeholder sprites. A placeholder sprite is a simple white shape, for example a triangle, a square, or a capsule. |
| [Import a sprite or spritesheet texture](import-images-sprites/import-images-sprites-landing.html "import-images-sprites/import-images-sprites-landing.html") | Import an image and use it as a sprite or set of sprites in a 2D scene. |
| [Cut out sprites from a texture](sprite-editor/use-editor.html "sprite-editor/use-editor.html") | To create sprites from a texture, use the default Sprite Editor tab of the Sprite Editor window. |
| [Crop a sprite](sprite-editor/generate-outline.html "sprite-editor/generate-outline.html") | Remove transparent pixels from a sprite or crop the sprite to a custom shape. |
| [Create collision shapes for a sprite](create-collision-geometry.html "create-collision-geometry.html") | Generate or create the shapes that Unity uses to determine if a sprite collides with other sprites. |
| [Sorting sprites](sort-sprites/sort-sprites-landing.html "sort-sprites/sort-sprites-landing.html") | Control the order of sprites with sorting layers, sorting groups, and distance calculations. |
| [Scaling sprites dynamically using 9-slicing](9-slice/9-slice-landing.html "9-slice/9-slice-landing.html") | Set up sprites so they stretch or repeat when you resize them, so you don’t need to create multiple sprites for different sizes. |
| [Masking sprites](mask/mask-landing.html "mask/mask-landing.html") | Hide or reveal parts of a sprite or a group of sprites. |
| [Packing sprites into a sprite atlas](atlas/atlas-landing.html "atlas/atlas-landing.html") | Optimize the performance of your project by combining multiple textures into a single texture. |
| [Sprite asset reference](../class-Sprite.html "../class-Sprite.html") | Explore the properties of a sprite asset. |
| [Sprite Renderer component reference](renderer/sprite-renderer-reference.html "renderer/sprite-renderer-reference.html") | Explore the properties you can use to customize how Unity renders a sprite in the scene. |
| [Sprite Editor window reference](sprite-editor/sprite-editor-window-reference-landing.html "sprite-editor/sprite-editor-window-reference-landing.html") | Explore the properties and settings you use to create sprites from a texture, edit its meshes, and rig a sprite for animation. |
| [2D Profiler module reference](profiler-2d.html "profiler-2d.html") | Explore the properties and settings of the 2D module in the Profiler window. |

## Additional resources

* [2D](../Unity2D.html "../Unity2D.html")
* [API documentation on Sprite](../../ScriptReference/Sprite.html "../../ScriptReference/Sprite.html")

Convert 2D assets from the Built-In Render Pipeline to URP

Add placeholder sprites

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/renderer/sprite-renderer-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* Sprite Renderer component reference

Sprite asset reference

Sprite Editor window reference

# Sprite Renderer component reference

Explore the properties you can use to customize how Unity renders a sprite in the scene.

| **Property** | **Description** |
| --- | --- |
| **Sprite** | Sets the sprite Unity renders. To select a sprite, drag a sprite asset from the **Project** window, or select the picker (**⊙**). |
| **Open Sprite Editor** | Opens the sprite texture in the **Sprite Editor** window. For more information, refer to [Sprite Editor window reference](../sprite-editor/sprite-editor-window-reference-landing.html "../sprite-editor/sprite-editor-window-reference-landing.html"). |
| **Color** | Tints the sprite with the selected color. Set the color to white to render without a tint. |
| **Flip** | Mirrors the texture along the x-axis or the y-axis. Enabling this property doesn’t move or mirror the location of the GameObject. |
| **Draw Mode** | Determines how Unity scales the sprite texture. The options are:  * **Simple**: Scales the entire sprite uniformly. This is the default. * **Sliced**: Stretches the center and edges of the sprite but keeps the corners at their original size. Use this option only if you [9-slice the sprite](../9-slice/9-slicing.html "../9-slice/9-slicing.html"). * **Tiled**: Repeats the sprite texture to fill the new dimensions of the sprite. Use this option only if you [9-slice the sprite](../9-slice/9-slicing.html "../9-slice/9-slicing.html"). For more information, refer to the [Draw Mode properties](#draw-mode-tiled "#draw-mode-tiled") section. |
| **Mask Interaction** | Set how a [sprite mask](../mask/mask-landing.html "../mask/mask-landing.html")A texture which defines which areas of an underlying image to reveal or hide. [More info](../../sprite/mask/mask-landing.html "../../sprite/mask/mask-landing.html") See in [Glossary](../../Glossary.html#SpriteMask "../../Glossary.html#SpriteMask") affects this sprite. The options are:  * **None**: Ignores sprite masks. * **Visible Inside Mask**: Renders only the parts of the sprite that overlap with the sprite mask. * **Visible Outside Mask**: Renders only the parts of the sprite that don’t overlap with the sprite mask. |
| **Sprite Sort Point** | Sets which point on the sprite Unity uses to calculate its distance on the camera, which affects [render order during sorting](../../2d-renderer-sorting.html "../../2d-renderer-sorting.html"). The options are:  * **Center**: Unity calculates the distance from the camera to the center of the sprite. * **Pivot**: Unity calculates the distance from the camera to the **Pivot** position of the sprite. To set the **Pivot** position, refer to [Sprite Editor tab reference for the Sprite Editor window](../sprite-editor/sprite-editor-window-reference.html "../sprite-editor/sprite-editor-window-reference.html"). |
| **Material** | Sets the material for the sprite. The default material is `Sprite-Lit-Default`. To set the material, drag a material from the **Project** window, or select the picker (**⊙**). |

### Draw Mode properties

The following properties are available when you set the **Draw Mode** to **Sliced** or **Tiled**.

| **Property** | **Description** |
| --- | --- |
| **Size** | Sets the size of the sprite. |
| **Tile Mode** | Sets how Unity repeats, or tiles, the texture across the resized sprite. This property is available only if you set **Draw Mode** to **Tiled**. The options are:  * **Continuous**: Doesn’t stretch the texture. The tiles at the edges might use cropped parts of the texture. * **Adaptive**: Stretches the center of the texture until the width or height reaches the **Stretch Value**, at which point it repeats. Each tile always uses the full texture. |
| **Stretch Value** | Sets the width or height at which the sprite texture stops stretching and repeats instead. A value of 1 for **Stretch Value** means the center of the sprite repeats when the sprite is twice its original size. A lower value means the sprite repeats less often. |

## Additional Settings

| **Property** | **Description** |
| --- | --- |
| **Sorting Layer** | Sets which layer the sprite belongs to, which determines when Unity renders it. Unity renders layers in the order of the list in the [Tags and layers window](../../class-TagManager.html "../../class-TagManager.html"). Select an existing layer, or select **Add Layer** to add a new sorting layer. For more information, refer to [Change the sorting order of 2D GameObjects](../../2d-renderer-sorting.html "../../2d-renderer-sorting.html"). |
| **Order in Layer** | Sets which sublayer the sprite belongs to within its **Sorting Layer**. Unity renders lower values before higher values. For more information, refer to [Change the sorting order of 2D GameObjects](../../2d-renderer-sorting.html "../../2d-renderer-sorting.html"). |
| **Rendering Layer Mask** | Sets which rendering layers this GameObject belongs to. For more information, refer to [Rendering Layers in URP](../../urp/features/rendering-layers.html "../../urp/features/rendering-layers.html"). |

## Additional resources

* [Add a sprite mask](../mask/hide-reveal-parts-sprite-mask.html "../mask/hide-reveal-parts-sprite-mask.html")
* [Sorting sprites](../sort-sprites/sort-sprites-landing.html "../sort-sprites/sort-sprites-landing.html")
* [9-slicing](../9-slice/9-slicing.html "../9-slice/9-slicing.html")

Sprite asset reference

Sprite Editor window reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/import-images-sprites/import-images-sprites-landing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* Import a sprite or spritesheet texture

Add placeholder sprites

Cut out sprites from a texture

# Import a sprite or spritesheet texture

Import an image and use it as a sprite or set of sprites in a 2D scene.

To use an imported image as one or more sprites, set its texture type to **Sprite (2D and UI)**. Follow these steps:

1. Make sure the 2D Sprite package is installed in your project. For more information, refer to [set up your project for 2D games](../../setup-project-2d-game.html "../../setup-project-2d-game.html").
2. Import your sprite image or spritesheet. For example, drag a spritesheet .png file into the **Project** window.
3. Select the imported image in the **Project** window.
4. In the **Inspector** window, set **Texture Type** to **Sprite (2D and UI)**.
5. Select **Apply**.

**Note:** In a 2D project, Unity automatically sets **Texture Type** to **Sprite (2D and UI)** when you import an image.

## Divide the texture into sprites

The **Sprite Mode** property of the texture determines whether Unity creates one sprite or multiple sprites from the texture.

For each sprite, Unity creates a sprite asset () as a child of the texture in the **Project** window.

Set **Sprite Mode** to the following:

* **Single** to use the texture as one sprite, either using the whole image or part of the image.
* **Multiple** to divide the texture into multiple sprites, for example if the texture is a spritesheet.

To set the shape and size of sprites, refer to [Create sprites from a texture](sprite/sprite-editor/use-editor.html "sprite/sprite-editor/use-editor.html").

## Add a sprite to a scene

To add a sprite to a scene, drag the sprite asset () from the **Project** window into the **Scene** window or **Hierarchy** window.

Unity creates a GameObject with a Sprite Renderer component. The component renders the sprite and controls how it appears in the scene.

### Add a sprite to an existing GameObject

To add a sprite to an existing GameObject, follow these steps:

1. Select the GameObject in the **Scene** or **Hierarchy** window.
2. In the **Inspector** window, select **Add Component**.
3. Select **Rendering** > **Sprite Renderer**.
4. In the **Sprite Renderer** component, set the **Sprite** property to the sprite you want to render.

## Additional resources

* [Create sprites from a texture](sprite/sprite-editor/use-editor.html "sprite/sprite-editor/use-editor.html")
* [Introduction to importing assets](../../ImportingAssets.html "../../ImportingAssets.html")
* [Sprite (2D and UI) import settings reference](../../texture-type-sprite.html "../../texture-type-sprite.html")
* [Texture Import Settings](../../class-TextureImporter.html "../../class-TextureImporter.html")

Add placeholder sprites

Cut out sprites from a texture

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/sorting-group/sorting-group-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* [Sorting sprites](../../sprite/sort-sprites/sort-sprites-landing.html "../../sprite/sort-sprites/sort-sprites-landing.html")
* Sorting Group component reference

Prevent 2D GameObjects mixing in sorting layers

Scaling sprites dynamically using 9-slicing

# Sorting Group component reference

Explore the properties you can use to determine the rendering order of a group of 2D GameObjects. For more information, refer to [Prevent 2D GameObjects mixing in sorting layers](use-sorting-groups.html "use-sorting-groups.html").

| **Property** | **Description** |
| --- | --- |
| **Sorting Layer** | Sets the [sorting layer](../../class-TagManager.html "../../class-TagManager.html") of the sorting group. All the child GameObjects render on this sorting layer, but keep their order. Unity renders sorting layers in the order of the list in the [Tags and layers window](../../class-TagManager.html "../../class-TagManager.html").  Select **Add Sorting Layer** to create a new sorting layer. |
| **Order in Layer** | Sets the sublayer of the sorting group within the **Sorting Layer**. All the child GameObjects render on this sublayer, but keep their order. Unity renders lower values before higher values. |
| **Sorting Type** | Sets where Unity places the group while sorting. The options are:  * **Default**: Unity sorts this group with other groups at the same level in the hierarchy. * **Sort at Root**: Unity sorts this group at the top level of the hierarchy, and ignores the parent sorting group. * **Sort 3D as 2D**: Unity sorts this group at the top level of the hierarchy, and ignores the z value of 3D GameObjects in the group so they’re sorted as 2D. |

## Additional resources

* [2D rendering order](../sort-sprites/sort-sprites.html "../sort-sprites/sort-sprites.html")

Prevent 2D GameObjects mixing in sorting layers

Scaling sprites dynamically using 9-slicing

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/sorting-group/use-sorting-groups.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* [Sorting sprites](../../sprite/sort-sprites/sort-sprites-landing.html "../../sprite/sort-sprites/sort-sprites-landing.html")
* Prevent 2D GameObjects mixing in sorting layers

Change the sorting order of 2D GameObjects

Sorting Group component reference

# Prevent 2D GameObjects mixing in sorting layers

To keep a group of 2D GameObjects from mixing with another group of objects on the same sorting layers and sublayers, add the GameObjects to a sorting group.

For example, you can use this approach to keep multiple instances of the same prefab from mixing with each other, even if they use the same sorting layers and sublayers.

Follow these steps:

1. In the **Hierarchy** window, create your group of 2D GameObjects, and set their **Sorting Layer** and **Order in Layer** values to sort them.
2. Select the GameObject at the top of the hierarchy of the group.
3. In the **Inspector** window, select **Add Component** > **Rendering** > **Sorting Group**.
4. In the **Sorting Group** component, set the **Sorting Layer** and **Order in Layer** values.

The sorting order remains the same, but all the child GameObjects now render on the sorting layer and sublayer of the Sorting Group component.

**Note:** Unity ignores the **Distance to Camera** property of each child GameObject. Unity calculates the distance based on the position of the GameObject that has the Sorting Group component.

## Nest sorting groups

You can nest sorting groups. A nested sorting group is sorted first, then sorted as a single item within the parent sorting group.

![A nested sorting group, its parent sorting group, and a third sorting group.](../../../uploads/Main/SG_diagram2.png)


A nested sorting group, its parent sorting group, and a third sorting group.

To move a nested sorting group to the top level of the hierarchy without moving it in the **Hierarchy** window, select the sorting group then set **Sorting Type** to **Sort At Root**.

## Example

In the following example, the sprites belong to the same **Sorting Layer**, but have different **Order in Layer** values. When you create a prefab from the hierarchy, the sprites from multiple prefab instances are on the same layers and can mix with each other.

![A prefab of a zombie character. The hierarchy represents the different Order in Layer values of the different body parts. For example, the arms are rendered in front of the body. The character looks correct.](../../../uploads/Main/character_hierarchy.png)


A prefab of a zombie character. The hierarchy represents the different **Order in Layer** values of the different body parts. For example, the arms are rendered in front of the body. The character looks correct.


![Two instances of the prefab without a sorting group. The sprites render incorrectly, because the body parts are all on the same sublayers.](../../../uploads/Main/part_intersect.png)


Two instances of the prefab without a sorting group. The sprites render incorrectly, because the body parts are all on the same sublayers.

If you add a sorting group, the prefab instances render correctly.

![Five instances of the prefab with a sorting group. The sprites render correctly.](../../../uploads/Main/unique_orderlayer.png)


Five instances of the prefab with a sorting group. The sprites render correctly.

If mixing still occurs, set the **Order in Layer** value to a different value for each sorting group.

## Additional resources

* [2D rendering order](../sort-sprites/sort-sprites.html "../sort-sprites/sort-sprites.html")

Change the sorting order of 2D GameObjects

Sorting Group component reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/mask/mask-landing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* Masking sprites

9-slice a sprite

Add a sprite mask

# Masking sprites

To hide parts of sprites, add a sprite mask to the scene. You place a sprite mask at a position in the scene, and the mask shape hides the sprites that overlap with it.

**Note:** Sprite masks are different to the mask map texture you [add as a secondary texture](../../urp/SecondaryTextures.html "../../urp/SecondaryTextures.html") to control which areas of a sprite receive light.

| **Topic** | **Description** |
| --- | --- |
| [Add a sprite mask](hide-reveal-parts-sprite-mask.html "hide-reveal-parts-sprite-mask.html") | Add a sprite mask to a scene, change its shape, and configure sprites so they’re affected by the mask. |
| [Sprite Mask component reference](sprite-mask-reference.html "sprite-mask-reference.html") | Explore the properties you use to hide and reveal parts of sprites with a sprite mask. |

## Additional resources

* [Sprite Editor](../sprite-editor/open-sprite-editor "../sprite-editor/open-sprite-editor")
* [2D renderer sorting](../../2d-renderer-sorting.html "../../2d-renderer-sorting.html")

9-slice a sprite

Add a sprite mask

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/mask/hide-reveal-parts-sprite-mask.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* [Masking sprites](../../sprite/mask/mask-landing.html "../../sprite/mask/mask-landing.html")
* Add a sprite mask

Masking sprites

Sprite Mask component reference

# Add a sprite mask

To hide parts of sprites, add a sprite mask to the scene. You place a sprite mask at a position in the scene, and the mask shape hides the sprites that overlap with it.

![A circular mask, with a crate sprite set to Visible Inside Mask. The parts of the sprite outside the mask are hidden.](../../../uploads/Main/2D_SpriteRenderer_8.png)
![The same circular mask, with a crate sprite set to Visible Outside Mask. The parts of the sprite that overlap the mask are hidden.](../../../uploads/Main/2D_SpriteRenderer_9.png)

Sprite masks only affect objects that have a [Sprite Renderer](../renderer/renderer-landing "../renderer/renderer-landing")A component that lets you display images as Sprites for use in both 2D and 3D scenes. [More info](../../sprite/renderer/sprite-renderer-reference.html "../../sprite/renderer/sprite-renderer-reference.html")  
See in [Glossary](../../Glossary.html#SpriteRenderer "../../Glossary.html#SpriteRenderer") component.

**Note:** Sprite masks are different to the mask map texture you [add as a secondary texture](../../urp/SecondaryTextures.html "../../urp/SecondaryTextures.html") to control which areas of a sprite receive light.

## Limitations

Sprite masks aren’t compatible with the following:

* [Scriptable Render Pipeline (SRP) Batcher](../../SRPBatcher.html "../../SRPBatcher.html"). If you use a sprite mask, Unity falls back to using dynamic batching. **Note:** The 2D renderer uses its own dynamic batching system, which isn’t affected by the **Dynamic Batching** setting in the Player settings window.
* GPU deformation of sprites in 2D animation. If you use a sprite mask, Unity falls back to using CPU deformation.

## Add a sprite mask

Follow these steps:

1. In your [2D renderer asset](../../urp/2DRendererData-overview.html "../../urp/2DRendererData-overview.html"), make sure **Depth/Stencil Buffer** is enabled.
2. To add a sprite mask to the scene, select **GameObject** > **2D Object** > **Sprite Mask**.

   The default mask shape is a circle.
3. In the **Hierarchy** window, select the sprite you want to mask.
4. In the **Inspector** window of the sprite, set **Mask Interaction** to **Visible Inside Mask** or **Visible Outside Mask**.
5. Make sure the sprite overlaps with the sprite mask.

## Change the shape of a mask

To change the shape of a mask, follow these steps:

1. Select the sprite mask GameObject.
2. In the **Inspector** window, select the **Sprite** picker (**⊙**).
3. Select a sprite from the list to use as a mask.

To use a custom shape, create a new sprite with the shape you want to use. Use opaque pixels for the mask shape, and a transparent background for outside the mask.

## Set which sprites a mask affects

To change which sprites a mask affects, assign the sprites to [sorting layers](../../2d-renderer-sorting.html "../../2d-renderer-sorting.html"), then restrict the sprite mask to a range of sorting layers using its **Custom Range** properties.

For example:

1. Open the [Tags and Layers window](../../class-TagManager.html "../../class-TagManager.html") and create three sorting layers: **Back**, **Middle**, and **Front**.
2. Create three sprites, and set their **Sorting Layer** properties to the different layers.
3. Select your sprite mask, and in the **Inspector** window enable **Custom Range**.
4. Set the front **Sorting Layer** to **Front**, and the back **Sorting Layer** to **Back**. The sprite mask now only affects the sprites in the **Front** and **Middle** sorting layers.

You can also use [Sorting Group components](../sorting-group/sorting-group-landing "../sorting-group/sorting-group-landing") to prevent multiple masks from interacting with each other.

![Left: Two sprite masks affect two card sprites, so the sprites overlap incorrectly. Right: Each sprite and its mask use their own sorting group, and the sprites overlap correctly.](../../../uploads/Main/SpriteMask7.jpg)


Left: Two sprite masks affect two card sprites, so the sprites overlap incorrectly. Right: Each sprite and its mask use their own sorting group, and the sprites overlap correctly.

## Additional resources

* [Sprite Mask component reference](sprite-mask-reference.html "sprite-mask-reference.html")

Masking sprites

Sprite Mask component reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/mask/sprite-mask-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* [Masking sprites](../../sprite/mask/mask-landing.html "../../sprite/mask/mask-landing.html")
* Sprite Mask component reference

Add a sprite mask

Packing sprites into atlas textures

# Sprite Mask component reference

Explore the properties you use to hide and reveal parts of sprites with a sprite mask. For more information about using sprite masks, refer to [Masking sprites](../mask/mask-landing.html "../mask/mask-landing.html").

| **Property** | **Description** |
| --- | --- |
| **Mask Source** | Selects what to use as the source of the mask texture. In the mask texture, use opaque pixels for the mask shape, and a transparent background for outside the mask. The options are:  * **Sprite**: Uses the texture from a sprite. * **Supported Renderer**: Uses the texture from the sprite on a renderer component attached to the GameObject. |
| **Sprite** | Sets the sprite to use as the source of the mask texture. This property is available only when you set **Mask Source** to **Sprite**. |
| **Supported Renderer** | Sets the renderer to use as the source of the mask texture. This option is available only when you set **Mask Source** to **Supported Renderer**, and the GameObject has one of the following renderer components attached:  * Sprite Renderer * Sprite Shape Renderer * Tilemap Renderer |
| **Sprite Sort Point** | Selects the point Unity uses as the distance of the mask from the camera, for example in sorting calculations. This option is available only when you set **Mask Source** to **Sprite**. The options are:  * **Center**: Uses the center of the sprite. * **Pivot**: Uses the **Pivot** property of the sprite. For more information about setting the pivot point, refer to [Sprite Editor](../sprite-editor/open-sprite-editor "../sprite-editor/open-sprite-editor"). |
| **Alpha Cutoff** | Sets the lowest alpha value Unity uses as a mask pixel. Lower values mean Unity includes more transparent pixels in the mask shape. |
| **Custom Range** | Sets the range of sorting layers that the mask affects. For more information, refer to the [Custom Range properties](#custom-range-properties "#custom-range-properties") section. |
| **Rendering Layer Mask** | Sets which rendering layers the mask affects. For more information, refer to [Rendering layers](../../urp/features/rendering-layers.html "../../urp/features/rendering-layers.html")A layer that defines how specific effects are applied across different objects. Rendering layers don’t define draw order. They’re selection groups you assign objects to. Rendering layers let lights, decals, shadows, and custom passes include or ignore specific objects. See in [Glossary](../../Glossary.html#renderinglayer "../../Glossary.html#renderinglayer"). |

## Custom Range properties

Sets the range of layers that the mask affects. These properties are only available when you enable **Custom Range**.

For example, if you set the **Back** **Sorting Layer** property to sorting layer 1 and the **Front** **Sorting Layer** property to sorting layer 2, the mask affects only sorting layer 2.

| **Property** | **Sub-Property** | **Description** |
| --- | --- | --- |
| **Front** | Sets the highest layer and sublayer the mask affects. |
| N/A | **Sorting Layer** | Sets the highest layer the mask affects, so that layers in front of this layer aren’t affected by the mask. |
| N/A | **Order in Layer** | Sets the highest sublayer in the **Sorting Layer** that the mask affects. |
| **Back** | Sets the lowest layer and sublayer not affected by the mask. |
| N/A | **Sorting Layer** | Sets the lowest layer not affected by the mask, so that both this layer and the layers behind aren’t affected by the mask. |
| N/A | **Order in Layer** | Sets the lowest sublayer not affected by the mask. |

## Additional resources

* [Sprite Editor](../sprite-editor/open-sprite-editor "../sprite-editor/open-sprite-editor")
* [2D renderer sorting](../../2d-renderer-sorting.html "../../2d-renderer-sorting.html")

Add a sprite mask

Packing sprites into atlas textures

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/sort-sprites/sort-sprites.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* [Sorting sprites](../../sprite/sort-sprites/sort-sprites-landing.html "../../sprite/sort-sprites/sort-sprites-landing.html")
* 2D rendering order

Sorting sprites

Change the sorting order of 2D GameObjects

# 2D rendering order

To determine whether a 2D object renders in front of another, Unity uses the following criteria. If Unity renders a GameObject before another, the first GameObject appears behind the other.

The following applies to sprites, tiles, and [sprite shapes](https://docs.unity3d.com/Packages/com.unity.2d.spriteshape@latest/index.html?subfolder=/manual/index.html "https://docs.unity3d.com/Packages/com.unity.2d.spriteshape@latest/index.html?subfolder=/manual/index.html").

1. Sorting layer: Unity renders a GameObject earlier if its **Sorting Layer** is higher in the list in the [Tags and Layers](../../class-TagManager.html "../../class-TagManager.html") window. For more information, refer to [Arrange 2D GameObjects in layers](../../2d-renderer-sorting.html#arrange-sprites-in-layers "../../2d-renderer-sorting.html#arrange-sprites-in-layers").
2. Sublayer: Unity renders a GameObject earlier if its **Order in Layer** property has a lower value. For more information, refer to [Arrange 2D GameObjects in layers](../../2d-renderer-sorting.html#arrange-sprites-in-layers "../../2d-renderer-sorting.html#arrange-sprites-in-layers").
3. Render pass order: Unity renders a GameObject earlier if the **Render Queue** property of its material is lower. For more information, refer to [Set the order within a layer and sublayer](../../2d-renderer-sorting.html#set-the-order-within-a-layer-and-sub-layer "../../2d-renderer-sorting.html#set-the-order-within-a-layer-and-sub-layer").
4. Distance: Unity renders a GameObject earlier if it’s further from the camera. The distance calculation depends on the **Projection** property of the camera, the **Transparency Sort Mode** property, and the **Sort Point** if the GameObject is a sprite. For more information, refer to [Set the order within a layer and sublayer](../../2d-renderer-sorting.html#set-the-order-within-a-layer-and-sub-layer "../../2d-renderer-sorting.html#set-the-order-within-a-layer-and-sub-layer").

   **Note**: By default, all sprites are on the same **Default** sorting layer, have the same **Order in Layer** value, and have the same **Render Queue** value. If you don’t change these settings, Unity uses the distance to camera as the first differentiator for sorting.
5. Shader and material properties: Unity renders GameObjects with the same shader and material properties together in a group. The order Unity uses to render the different groups isn’t guaranteed.

If all the previous values are the same for two GameObjects, Unity has an internal render queue order that determines which GameObject renders first. This order isn’t guaranteed and you can’t control it.

The order can be different depending on your project.

**Note:** If you add a set of GameObjects to a Sorting Group component, the group renders as one unit on a single sorting layer and sublayer. You can still sort the GameObjects inside the group. Use Sorting Groups to avoid instances of [prefabs](../../prefabs-introduction.html "../../prefabs-introduction.html")An asset type that allows you to store a GameObject complete with components and properties. The prefab acts as a template from which you can create new object instances in the scene. [More info](../../Prefabs.html "../../Prefabs.html")  
See in [Glossary](../../Glossary.html#prefab "../../Glossary.html#prefab") mixing with each other. For more information, refer to [Prevent 2D GameObjects mixing in sorting layers](sprite/sorting-group/use-sorting-groups.html "sprite/sorting-group/use-sorting-groups.html").

## Additional resources

* [Render queues and sorting behaviours](../../built-in-rendering-order.html "../../built-in-rendering-order.html")
* [Introduction to the camera view](../../UnderstandingFrustum.html "../../UnderstandingFrustum.html")
* [Change the sorting order of 2D GameObjects](../../2d-renderer-sorting.html "../../2d-renderer-sorting.html")

Sorting sprites

Change the sorting order of 2D GameObjects

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/sort-sprites/sort-sprites-landing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* Sorting sprites

Create collision shapes for a sprite

2D rendering order

# Sorting sprites

Resources for understanding how Unity orders 2D GameObjects in a scene, and how to control the order with sorting layers, sorting groups, and distance calculations.

| **Topic** | **Description** |
| --- | --- |
| [2D rendering order](sort-sprites.html "sort-sprites.html") | Learn about the criteria Unity uses to decide whether one 2D GameObject renders in front of another. |
| [Change the sorting order of 2D GameObjects](../../2d-renderer-sorting.html "../../2d-renderer-sorting.html") | Arrange 2D GameObjects in layers, set the order within a layer, and change how Unity calculates distance. |
| [Prevent 2D GameObjects mixing in sorting layers](../sorting-group/use-sorting-groups.html "../sorting-group/use-sorting-groups.html") | Keep groups of 2D GameObjects from mixing together on the same sorting layers and sublayers. |
| [Sorting Group component reference](../sorting-group/sorting-group-reference.html "../sorting-group/sorting-group-reference.html") | Explore the properties you can use to determine the rendering order of a group of 2D GameObjects. |

## Additional resources

* [Sprites](../sprite-landing.html "../sprite-landing.html")A 2D graphic objects. If you are used to working in 3D, Sprites are essentially just standard textures but there are special techniques for combining and managing sprite textures for efficiency and convenience during development. [More info](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")  
  See in [Glossary](../../Glossary.html#Sprite "../../Glossary.html#Sprite")

Create collision shapes for a sprite

2D rendering order

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/9-slice/9-slicing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* [Scaling sprites dynamically using 9-slicing](../../sprite/9-slice/9-slice-landing.html "../../sprite/9-slice/9-slice-landing.html")
* 9-slicing

Scaling sprites dynamically using 9-slicing

9-slice a sprite

# 9-slicing

9-slicing is a 2D technique that allows you to resize a sprite without creating multiple sprites for all the different sizes.

To use 9-slicing, you create a sprite with nine sections. The different sections stretch or repeat in different ways to keep the sprite in proportion.

9-slicing is useful for creating patterns, walls, or floors in a 2D environment.

**Note**: You can only use a [Box Collider 2D](../../2d-physics/collider/box-collider-2d-reference.html "../../2d-physics/collider/box-collider-2d-reference.html") or [Polygon Collider 2D](../../2d-physics/collider/polygon-collider-2d-reference.html "../../2d-physics/collider/polygon-collider-2d-reference.html") component to add a collision shape to a 9-sliced sprite. For more information, refer to [9-slice a sprite](set-sprite-9slicing.html "set-sprite-9slicing.html").

## 9-slicing modes

If you don’t use 9-slicing, the entire sprite stretches when you change its dimensions.

![A square floor sprite.](../../../uploads/Main/9-slice-4.jpg)


A square floor sprite.


![The same sprite resized so its wider. The floor, walls, and corners all stretch horizontally.](../../../uploads/Main/9-slice-5.png)


The same sprite resized so it’s wider. The floor, walls, and corners all stretch horizontally.

With 9-slicing, you can resize the sprite using sliced mode or tiled mode.

### Sliced

In sliced mode, the sprite does the following:

* The corners stay the same size.
* The top and bottom borders of the sprite stretch only horizontally.
* The left and right borders of the sprite stretch only vertically.
* The center stretches horizontally and vertically.

![The same sprite in sliced mode, resized so its wider.](../../../uploads/Main/9-slice-6.png)


The same sprite in sliced mode, resized so it’s wider.

### Tiled

In tiled mode, the sprite does the following:

* The corners stay the same size.
* The top and bottom borders of the sprite repeat horizontally.
* The left and right borders of the sprite repeat vertically.
* The center repeats horizontally and vertically.

![The same sprite in tiled mode, resized so its wider.](../../../uploads/Main/9-slice-7.png)


The same sprite in tiled mode, resized so it’s wider.

You can control how Unity repeats the texture across the resized sprite. For more information, refer to [9-slice a sprite](set-sprite-9slicing.html "set-sprite-9slicing.html").

## Additional resources

* [Import a sprite or texture](../import-images-sprites/import-images-sprites-landing.html "../import-images-sprites/import-images-sprites-landing.html")
* [Set background images](../../UIB-styling-ui-backgrounds.html "../../UIB-styling-ui-backgrounds.html") in the UI Toolkit documentation.

Scaling sprites dynamically using 9-slicing

9-slice a sprite

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/9-slice/9-slice-landing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* Scaling sprites dynamically using 9-slicing

Sorting Group component reference

9-slicing

# Scaling sprites dynamically using 9-slicing

Set up sprites such as walls or floors so they stretch or repeat when you resize them, and you don’t need to create multiple sprites for different sizes.

This technique is known as 9-slicing, because it involves dividing a sprite into nine sections.

| **Topic** | Description |
| --- | --- |
| [9-slicing](9-slicing.html "9-slicing.html") | Learn about creating a sprite with nine sections, so the sections stretch or repeat in different ways to keep the sprite in proportion. |
| [9-slice a sprite](set-sprite-9slicing.html "set-sprite-9slicing.html") | Divide a sprite into nine sections for 9-slicing, and add a collision shape. |

## Additional resources

* [Tilemaps](../../tilemaps/tilemaps-landing.html "../../tilemaps/tilemaps-landing.html")A GameObject that allows you to quickly create 2D levels using tiles and a grid overlay. [More info](../../tilemaps/work-with-tilemaps/tilemap-reference.html "../../tilemaps/work-with-tilemaps/tilemap-reference.html")  
  See in [Glossary](../../Glossary.html#Tilemap "../../Glossary.html#Tilemap")
* [Rule tiles](https://docs.unity3d.com/Packages/com.unity.2d.tilemap.extras@latest/index.html?subfolder=/manual/RuleTile.html "https://docs.unity3d.com/Packages/com.unity.2d.tilemap.extras@latest/index.html?subfolder=/manual/RuleTile.html") in the 2D Tilemap Extras package
* [Using 9-Slicing for Scalable Sprites](https://learn.unity.com/course/developing-interactive-user-interfaces-toolkit-2019-2/tutorial/using-9-slicing-for-scalable-sprites "https://learn.unity.com/course/developing-interactive-user-interfaces-toolkit-2019-2/tutorial/using-9-slicing-for-scalable-sprites") on the Unity Learn site.

Sorting Group component reference

9-slicing

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/9-slice/set-sprite-9slicing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* [Scaling sprites dynamically using 9-slicing](../../sprite/9-slice/9-slice-landing.html "../../sprite/9-slice/9-slice-landing.html")
* 9-slice a sprite

9-slicing

Masking sprites

# 9-slice a sprite

Divide a sprite into nine sections so Unity can stretch or repeat the different sections, and add a collision shape.

## Create a sprite with 9 sections

Follow these steps:

1. Select the sprite texture in the **Project** window.
2. In the **Inspector** window, set **Mesh Type** to **Full Rect**, then select **Apply**.

   If you set **Mesh Type** to **Tight** instead, 9-slicing might not work correctly, because of the way Unity generates and renders the sprite.
3. Select **Open Sprite Editor**.
4. Select the sprite you want to 9-slice.
5. Click and drag the green handles inward to define the borders of the sprite, for example the walls of a floor tile. Or enter the values in the **Sprite** overlay, using the **L**, **R**, **T**, and **B** fields for left, right, top, and bottom.

   ![A floor texture with 4 surrounding walls.](../../../uploads/Main/9-slice-0.png)


   A floor texture with 4 surrounding walls.

   The borders define the nine areas of the sprite: the central area (**E**), the four walls (**B**, **D**, **F**, and **H**), and the four corners (**A**, **C**, **G**, and **I**).
6. Select **Apply**.
7. Drag the sprite asset from the **Project** window to the **Scene** view as normal.
8. In the **Inspector** window for the sprite, in the **Sprite Renderer** component, set **Draw Mode** to **Sliced** or **Tiled** depending on the behavior you want. For more information, refer to [9-slicing modes](9-slicing.html#9-slicing-modes "9-slicing.html#9-slicing-modes").

**Note:** Setting **Draw Mode** to **Sliced** or **Tiled** means the Sprite Renderer component controls the Collider 2D component. As a result, you can’t edit the Collider 2D component manually.

When you resize this sprite, the sections behave as follows:

* The four corners (**A**, **C**, **G** and **I**) do not change in size.
* The top and bottom walls (**B** and **H**) horizontally stretch or repeat, depending on **Draw Mode**.
* The left and right walls (**D** and **F**) vertically stretch or repeat, depending on **Draw Mode**.
* The central floor (**E**) stretches or repeats, depending on **Draw Mode**.

If you set **Draw Mode** to **Sliced**, Unity uses simple scaling if you resize the sprite using the **Transform** component of the GameObject or the transform tool in the Scene view.

## Configure tiling

If you set **Draw Mode** to **Tiled**, use the **Tile Mode** property to control how Unity repeats, or tiles, the texture. The options are:

* **Continuous**: The texture doesn’t stretch. The tiles at the edges might use cropped parts of the texture.
* **Adaptive**: The center of the texture stretches until the width or height reaches the **Stretch Value**, at which point it repeats. Each tile always uses the full texture.

A value of 1 for **Stretch Value** means the sprite repeats when the sprite is twice its original size. A lower value means the sprite repeats less often.

![The floor texture with Tile Mode set to Continuous.](../../../uploads/Main/9-slice-9.png)


The floor texture with Tile Mode set to Continuous.


![The floor texture with Tile Mode set to Adaptive, and Stretch Value set to 1.](../../../uploads/Main/9-slice-11.png)


The floor texture with Tile Mode set to Adaptive, and Stretch Value set to 1.


![The floor texture with Tile Mode set to Adaptive, and Stretch Value set to 0.5.](../../../uploads/Main/9-slice-12.png)


The floor texture with Tile Mode set to Adaptive, and Stretch Value set to 0.5.

## Add a collision shape

To add a collision shape to a 9-sliced sprite, follow these steps:

1. Select the sprite in the **Hierarchy** window.
2. In the **Inspector** window, select **Add Component**.
3. Select either a [Box Collider 2D](../../2d-physics/collider/box-collider-2d-reference.html "../../2d-physics/collider/box-collider-2d-reference.html") or [Polygon Collider 2D](../../2d-physics/collider/polygon-collider-2d-reference.html "../../2d-physics/collider/polygon-collider-2d-reference.html") component.

   Other types of Collider 2D component don’t support 9-slicing.
4. Enable **Auto Tiling**. Unity now automatically updates the collider shape when the dimensions of the sprite change.

Unity can add additional edges to the collider shape when you enable **Auto Tiling**. This can have an effect on collisions.

## Additional resources

* [9-slicing](9-slicing.html "9-slicing.html")
* [Import a sprite or spritesheet texture](../import-images-sprites/import-images-sprites-landing.html "../import-images-sprites/import-images-sprites-landing.html")
* [Using 9-Slicing for Scalable Sprites](https://learn.unity.com/course/developing-interactive-user-interfaces-toolkit-2019-2/tutorial/using-9-slicing-for-scalable-sprites "https://learn.unity.com/course/developing-interactive-user-interfaces-toolkit-2019-2/tutorial/using-9-slicing-for-scalable-sprites") on the Unity Learn site.

9-slicing

Masking sprites

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/placeholder/placeholder-landing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* Add placeholder sprites

Sprites

Import a sprite or spritesheet texture

# Add placeholder sprites

To quickly test sprites, create temporary placeholder sprites. A placeholder sprite is a simple white shape, for example a triangle, a square, or a capsule.

Follow these steps:

1. Make sure the 2D Sprite package is installed in your project. For more information, refer to [set up your project for 2D games](../../setup-project-2d-game.html "../../setup-project-2d-game.html").
2. From the main menu, select **GameObject** > **2D Object** > **Sprites**.
3. Select a sprite shape.

Unity creates a GameObject with a Sprite Renderer component that references a placeholder sprite shape.

For more information about the different placeholder sprite shapes, refer to [Types of 2D primitive GameObjects](../../2DPrimitiveObjects.html "../../2DPrimitiveObjects.html").

## Replace a placeholder sprite

You can’t edit a placeholder sprite or its texture in the **Sprite Editor**. To replace the placeholder sprite with a sprite you imported, follow these steps:

1. Select the placeholder sprite.
2. In the **Inspector** window, in the **Sprite Renderer** component, select the **Sprite** picker (**⊙**).
3. Choose a sprite you imported.

For more information, refer to [import sprites](../import-images-sprites/import-images-sprites-landing.html "../import-images-sprites/import-images-sprites-landing.html").

## Additional resources

* [Sprite Renderer](../renderer/sprite-renderer-reference.html "../renderer/sprite-renderer-reference.html")A component that lets you display images as Sprites for use in both 2D and 3D scenes. [More info](../../sprite/renderer/sprite-renderer-reference.html "../../sprite/renderer/sprite-renderer-reference.html")  
  See in [Glossary](../../Glossary.html#SpriteRenderer "../../Glossary.html#SpriteRenderer")

Sprites

Import a sprite or spritesheet texture

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/atlas/atlas-landing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* Packing sprites into atlas textures

Sprite Mask component reference

Sprite atlases

# Packing sprites into atlas textures

To reduce the number of [draw calls](../../DrawCallBatching.html "../../DrawCallBatching.html") Unity sends to the GPU, create a sprite atlas. A sprite atlas combines multiple textures into a single texture. Unity only needs to create one draw call for all the sprites in a sprite atlas.

| **Page** | **Description** |
| --- | --- |
| [Sprite atlases](atlas-introduction.html "atlas-introduction.html") | Learn about sprite atlases and how to use them to optimize performance. |
| [Create a sprite atlas](create-sprite-atlas.html "create-sprite-atlas.html") | Create a sprite atlas, add sprites and textures to it, and analyze and optimize it. |
| [Create lower resolution versions of sprite atlases](master-variant/master-variant-sprite-atlases.html "master-variant/master-variant-sprite-atlases.html") | To create different versions of the same sprite atlas for different platforms, create sprite atlas variants. |
| [Load sprite atlases manually at runtime](distribution/load-sprite-atlas-spriteatlasmanageratlasrequested.html "distribution/load-sprite-atlas-spriteatlasmanageratlasrequested.html") | To avoid Unity loading sprite atlases when your project starts, load the sprite atlas yourself at runtime instead. |
| [Upgrade Sprite Atlas V1 assets](v2/sprite-atlas-v2.html "v2/sprite-atlas-v2.html") | Upgrade Sprite Atlas V1 assets from Unity version 2022.2 and earlier to Sprite Atlas V2 assets. |
| [Sprite Atlas Inspector window reference](sprite-atlas-reference.html "sprite-atlas-reference.html") | Explore the properties and settings you can use to customize a sprite atlas. |

## Additional resources

* [Sprite atlas best practices in Unity 6](https://www.youtube.com/watch?v=hXlpnwD-TgY "https://www.youtube.com/watch?v=hXlpnwD-TgY") on the Unity YouTube channel
* [2D game art, animation, and lighting for artists](https://unity.com/resources/2d-game-art-animation-lighting-unity-6-3-lts?isGated=false "https://unity.com/resources/2d-game-art-animation-lighting-unity-6-3-lts?isGated=false")

Sprite Mask component reference

Sprite atlases

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/atlas/atlas-introduction.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* [Packing sprites into atlas textures](../../sprite/atlas/atlas-landing.html "../../sprite/atlas/atlas-landing.html")
* Sprite atlases

Packing sprites into atlas textures

Create a sprite atlas

# Sprite atlases

If you use a separate texture for each of your sprites, Unity has to create and send a separate [draw call](../../DrawCallBatching.html "../../DrawCallBatching.html") to the GPU for each texture. As a result, performance can decrease.

To reduce the number of draw calls, create a sprite atlas. A sprite atlas combines multiple textures into a single texture. Unity only needs to create one draw call for all the sprites in a sprite atlas.

**Note**: If you use the [Scriptable Render Pipeline Batcher](../../SRPBatcher.html "../../SRPBatcher.html"), the number of draw calls might not decrease, but performance still improves a similar amount.

![A sprite atlas texture in the Preview window. Seven crystals of different sizes are packed into one texture in different orientations.](../../../uploads/Main/sprite_atlas_preview.png)


A sprite atlas texture in the Preview window. Seven crystals of different sizes are packed into one texture in different orientations.

For more information, refer to [Create a sprite atlas](create-sprite-atlas.html "create-sprite-atlas.html").

## Assigning sprites to different sprite atlases

To avoid Unity sending multiple sprite atlases in a draw call, the recommended best practice is to create separate sprite atlases for the following:

* Each set of sprites you use at the same time, for example a different sprite atlas for each scene. This avoids Unity loading unused sprites into memory, or creating multiple combined textures for a large number of sprites.
* Sprites that need different compression settings. For example, create a sprite atlas for highly detailed character sprites, and a separate sprite atlas for less-detailed environment sprites.
* Frequently used and infrequently used sprites.

To report on and analyze the performance of your sprite atlases, refer to [Get started with the Sprite Atlas Analyzer](https://docs.unity3d.com/Packages/com.unity.2d.tooling@latest/index.html?subfolder=/manual/GetStarted-sprite-atlas-analyzer.html "https://docs.unity3d.com/Packages/com.unity.2d.tooling@latest/index.html?subfolder=/manual/GetStarted-sprite-atlas-analyzer.html") in the 2D Tooling package.

## Additional resources

* [Sprite atlas best practices in Unity 6](https://www.youtube.com/watch?v=hXlpnwD-TgY "https://www.youtube.com/watch?v=hXlpnwD-TgY") on the Unity YouTube channel
* [2D game art, animation, and lighting for artists](https://unity.com/resources/2d-game-art-animation-lighting-unity-6-3-lts?isGated=false "https://unity.com/resources/2d-game-art-animation-lighting-unity-6-3-lts?isGated=false")

Packing sprites into atlas textures

Create a sprite atlas

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/atlas/create-sprite-atlas.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* [Packing sprites into atlas textures](../../sprite/atlas/atlas-landing.html "../../sprite/atlas/atlas-landing.html")
* Create a sprite atlas

Sprite atlases

Create lower resolution versions of sprite atlases

# Create a sprite atlas

Create a [sprite atlas](atlas-introduction.html "atlas-introduction.html")**Graphics:**A utility that packs several sprite textures tightly together within a single texture known as an atlas. [More info](../../sprite/atlas/v2/v2-landing "../../sprite/atlas/v2/v2-landing"). **2D:** A texture that is composed of several smaller textures. Also referred to as a texture atlas, image sprite, sprite sheet or packed texture. [More info](../../sprite/atlas/atlas-landing.html "../../sprite/atlas/atlas-landing.html").  
See in [Glossary](../../Glossary.html#SpriteAtlas "../../Glossary.html#SpriteAtlas") and pack sprites into it.

**Note:** You can also create multiple sprites from a single texture instead. For more information, refer to [Import a sprite or spritesheet texture](../import-images-sprites/import-images-sprites-landing.html "../import-images-sprites/import-images-sprites-landing.html") and [Cut out sprites from a texture](../sprite-editor/use-editor.html "../sprite-editor/use-editor.html").

## Prepare sprites for packing

To optimize the performance of sprite atlases and the memory they use, do the following for each texture you want to pack:

* Disable **Read/Write** unless you read or write to the texture in C# scripts.
* Enable **Tight Packing** to reduce the number of transparent pixels around the sprite.

Select **Open Sprite Editor** and check the following:

* The **Custom Outline** tab, to make sure the outline fits closely to the sprite. For more information, refer to [Crop a sprite](../sprite-editor/generate-outline.html "../sprite-editor/generate-outline.html").
* The **Secondary Textures** tab, to make sure the sprite has the same number of secondary textures as the other sprites you want to pack it with. Otherwise the combined secondary textures in the sprite atlas might contain a lot of empty space. For more information, refer to [Add normal map and mask map textures to a sprite](../../urp/SecondaryTextures.html "../../urp/SecondaryTextures.html").

## Create a sprite atlas

To create a sprite atlas, from the main menu, go to **Assets** > **Create** > **2D** > **Sprite Atlas**.

Unity creates a file with a `.spriteatlasv2` file extension in the **Project** window. Unity no longer uses Sprite Atlas V1 format by default. For more information, refer to [Convert Sprite Atlas V1 assets](v2/sprite-atlas-v2.html "v2/sprite-atlas-v2.html").

## Add sprites to a sprite atlas

For more information about assigning sprites to different sprite atlases, refer to [Sprite atlases](atlas-introduction.html "atlas-introduction.html").

1. In the **Project** window, select the sprite atlas asset.
2. To add a sprite to the sprite atlas, drag a sprite from the **Project** window onto the **Objects for Packing** label in the **Inspector** window.

   You can drag sprites, textures, or folders onto the **Objects for Packing** label. You can also select the **Add** (**+**) button in the **Objects for Packing** section.
3. Select **Pack Preview** to display the packed texture in the **Preview** window at the bottom of the **Inspector** window.

If your textures have normal maps or mask maps as secondary textures, select the dropdown at the top-right of the **Preview** window to display the combined secondary textures.

Sprites now render using their sprite atlas texture in the Scene view, the Game view, and in Play mode. Unity also includes sprite atlases in your builds by default, and automatically loads and uses them at runtime.

**Note:** If you add a sprite to multiple sprite atlases, Unity randomly chooses which sprite atlas texture to use at runtime. To avoid this, refer to [Load sprite atlases manually at runtime](distribution/load-sprite-atlas-spriteatlasmanageratlasrequested.html "distribution/load-sprite-atlas-spriteatlasmanageratlasrequested.html").

## Analyze and optimize sprite atlases

To report on and analyze the performance of your sprite atlases, use either of the following:

* The [2D Profiler module](../profiler-2d.html "../profiler-2d.html") in the Profiler window.
* The Sprite Atlas Analyzer, which reports on issues such as wasted space, sprite atlases that use only a single sprite, and sprite atlases with multiple pages. For more information, refer to [Get started with the Sprite Atlas Analyzer](https://docs.unity3d.com/Packages/com.unity.2d.tooling@latest/index.html?subfolder=/manual/GetStarted-sprite-atlas-analyzer.html "https://docs.unity3d.com/Packages/com.unity.2d.tooling@latest/index.html?subfolder=/manual/GetStarted-sprite-atlas-analyzer.html") in the 2D Tooling package.

## Use the original textures while editing

To use the original unpacked textures in the Scene view and Game view, but keep using the sprite atlas textures in Play mode and at runtime, follow these steps:

1. From the main menu, select **Edit** > **Project Settings**.
2. Select **Editor**.
3. In the **Sprite Atlas** section, set **Mode** to **Sprite Atlas V2 - Enabled for Builds**. Unity now builds and uses sprite atlases only when you enter Play mode or build your project.

For information on other **Mode** values, refer to [Editor settings](../../class-EditorManager.html "../../class-EditorManager.html").

## Additional resources

* [Sprite atlas best practices in Unity 6](https://www.youtube.com/watch?v=hXlpnwD-TgY "https://www.youtube.com/watch?v=hXlpnwD-TgY") on the Unity YouTube channel
* [2D game art, animation, and lighting for artists](https://unity.com/resources/2d-game-art-animation-lighting-unity-6-3-lts?isGated=false "https://unity.com/resources/2d-game-art-animation-lighting-unity-6-3-lts?isGated=false")
* [`SpriteAtlasManager.CreateSpriteAtlas`](../../../ScriptReference/U2D.SpriteAtlasManager.CreateSpriteAtlas.html "../../../ScriptReference/U2D.SpriteAtlasManager.CreateSpriteAtlas.html")

Sprite atlases

Create lower resolution versions of sprite atlases

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/atlas/sprite-atlas-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* [Packing sprites into atlas textures](../../sprite/atlas/atlas-landing.html "../../sprite/atlas/atlas-landing.html")
* Sprite Atlas Inspector window reference

Upgrade Sprite Atlas V1 assets

Sprite asset reference

# Sprite Atlas Inspector window reference

Explore the properties and settings you can use to customize a sprite atlas. For more information, refer to [Create a sprite atlas](create-sprite-atlas.html "create-sprite-atlas.html").

| **Property** | **Description** |
| --- | --- |
| **Type** | Sets whether the sprite atlas is a lower-resolution version of another sprite atlas. The options are:  * **Master**: Indicates the sprite atlas can be used as the parent of a **Variant** sprite atlas. This is the default. * **Variant**: Indicates that the sprite atlas is a lower-resolution version of another sprite atlas.  For more information, refer to [Create lower resolution versions of sprite atlases](master-variant/master-variant-sprite-atlases.html "master-variant/master-variant-sprite-atlases.html"). |
| **Master Atlas** | Sets the parent sprite atlas. This property is available only if you set **Type** to **Variant**. The parent sprite atlas must have a **Type** of **Master**. For more information, refer to [Create lower resolution versions of sprite atlases](master-variant/master-variant-sprite-atlases.html "master-variant/master-variant-sprite-atlases.html"). |
| **Include in Build** | Enables Unity loading the sprite atlas and attaching it to your sprites when your project starts. Disable this property to load the sprite atlas yourself at runtime instead. For more information, refer to [Load sprite atlases manually at runtime](distribution/load-sprite-atlas-spriteatlasmanageratlasrequested.html "distribution/load-sprite-atlas-spriteatlasmanageratlasrequested.html"). |

## Variant

| **Property** | **Description** |
| --- | --- |
| **Scale** | Sets the scale of the variant sprite atlas as a multiple of its parent sprite atlas. For example, set **Scale** to 0.5 to create a sprite atlas texture half the resolution of the parent sprite atlas. The maximum value is 1. This property is available only if you set **Type** to **Variant**. For more information, refer to [Create lower resolution versions of sprite atlases](master-variant/master-variant-sprite-atlases.html "master-variant/master-variant-sprite-atlases.html"). |

## Packing

These properties are available only if you set **Type** to **Master**.

| **Property** | **Description** |
| --- | --- |
| **Allow Rotation** | Rotates sprites in the sprite atlas texture to find a better fit. Disable this property if you pack [Canvas UI](UICanvas "UICanvas") elements, to avoid UI elements rotating. |
| **Tight Packing** | Packs each sprite based on its mesh shape from the Custom Outline tab of the Sprite Editor window, instead of the default rectangle. |
| **Alpha Dilation** | Expands the colors of the edge of the sprite into adjacent transparent pixels, to prevent visible edges. |
| **Padding** | Sets how many pixels Unity uses between individual sprites, to prevent pixels from one sprite appearing in an adjacent sprite. The default value is 4. |

## Texture

| **Property** | **Description** |
| --- | --- |
| **Read/Write** | Allows you to access the data of the sprite atlas in C# scripts using methods such as [Texture2D.SetPixels](../../../ScriptReference/Texture2D.SetPixels.html "../../../ScriptReference/Texture2D.SetPixels.html"). If you enable this property, Unity creates a duplicate copy of the texture data, which can reduce performance. This property only has an effect if the sprite atlas is uncompressed or uses DXT compression. |
| **Generate Mip Maps** | Creates mipmap levels for the sprite atlas texture. For more information, refer to [Mipmaps](../../texture-mipmaps-introduction.html "../../texture-mipmaps-introduction.html"). |
| **sRGB** | Stores the sprite atlas colors in gamma space. For more information, refer to [Color spaces](../../color-spaces-landing.html "../../color-spaces-landing.html"). |
| **Filter Mode** | Specifies how Unity filters the sprite atlas when it stretches. The options are:  * **Point**: Uses the nearest pixel. This makes the sprite atlas appear pixelated. * **Bilinear**: Uses a weighted average of the four nearest texels. This makes the sprite atlas appear blurry when you magnify it. * **Trilinear**: Uses a weighted average of the two nearest mipmap levels, which Unity filters using bilinear filtering. This creates a soft transition between mipmap levels, but the sprite atlas is slightly more blurry. |
| **Aniso Level** | Sets the anisotropic filtering level of the sprite atlas. This increases texture quality when you view the sprite atlas at a steep angle. This property is available only if you enable **Generate Mip Maps** and set **Filter Mode** to **Bilinear** or **Trilinear**. |

## Show Platform Settings

The properties in this section set the size and format of the sprite atlas texture.

| **Property** | **Description** |
| --- | --- |
| **Show Platform Settings For** | Selects which texture the properties in the **Default** tab and the platform-specific tabs display. Select either the main texture of the sprite atlas, or a secondary texture. For more information about secondary textures, refer to [Add normal map and mask map textures to a sprite](../../urp/SecondaryTextures.html "../../urp/SecondaryTextures.html"). |

### Default tab

The **Default** tab lets you set the final size and format of the sprite atlas texture on all platforms.

| **Property** | **Description** |
| --- | --- |
| **Max Texture Size** | Sets the maximum dimensions of the sprite atlas in pixels. If any of the sprites or textures are larger than the **Max Texture Size**, Unity ignores the **Max Texture Size** setting and uses the minimum size that contains the sprites and textures at their original dimensions.  **Important**: Don’t use **Max Texture Size** values smaller than 0.25 for [variant sprite atlases](master-variant/master-variant-sprite-atlases.html "master-variant/master-variant-sprite-atlases.html"), otherwise Unity compresses the sprites and textures twice. |
| **Format** | Sets the number of channels and the data type of the sprite atlas, except for platforms you override in the platform-specific override tabs. The default is **Automatic**, where Unity selects a value based on the number of channels in the sprites, and the **Compression** setting. For more information, refer to [Default formats](../../class-TextureImporter-type-specific.html#default-formats "../../class-TextureImporter-type-specific.html#default-formats"). |
| **Compression** | Sets the compression of the sprite atlas. Unity uses this setting to select an appropriate texture format. This setting is only available if you set **Format** to **Automatic**. For more information, refer to [Default formats](../../class-TextureImporter-type-specific.html#default-formats "../../class-TextureImporter-type-specific.html#default-formats"). The options are:  * **None**: Don’t compress the sprite atlas. * **Low Quality**: Compresses the sprite atlas using a low-quality texture format. The compressed texture might use less memory than **Normal Quality**. * **Normal Quality**: Compresses the sprite atlas using a standard texture format. * **High Quality**: Compresses the sprite atlas using a high-quality texture format. The compressed texture might use more memory than **Normal Quality**. |
| **Use Crunch Compression** | Compresses the sprite atlas using the Crunch compression library, which helps Unity use the lowest possible amount of space. This setting is only available if you set **Format** to **Automatic**. Unity decompresses the sprite atlas to DXT or ETC format on the CPU, then uploads it to the GPU at runtime. If you enable this setting, textures might take a long time to compress, but decompression at runtime is fast. |
| **Compressor Quality** | Sets the image quality of the compressed texture, if you enable **Use Crunch Compression**. A higher value might use more memory and increase compression time. |

### Platform-specific overrides tabs

The platform-specific override tabs let you override the settings in the **Default** tab for specific platforms. For more information about build platforms, refer to [Build Profiles window reference](../../build-profiles-reference.html "../../build-profiles-reference.html").

| **Property** | **Description** |
| --- | --- |
| **Max Texture Size** | Sets the maximum dimensions of the imported texture in pixels. If any of the sprites or textures are larger than the **Max Texture Size**, Unity ignores the **Max Texture Size** setting and uses the minimum size that contains the sprites and textures at their original dimensions.  **Important**: Don’t use **Max Texture Size** values smaller than 0.25 for [variant sprite atlases](master-variant/master-variant-sprite-atlases.html "master-variant/master-variant-sprite-atlases.html"), otherwise Unity compresses the sprites and textures twice. |
| **Format** | Sets the sprite atlas format. The available texture formats depend on the platform. Unity selects the default format based on the platform and the settings in the **Default** tab. For more information, refer to [Default formats](../../class-TextureImporter-type-specific.html#default-formats "../../class-TextureImporter-type-specific.html#default-formats"). |
| **Compressor quality** | Sets the quality of the sprite atlas that compression produces. This setting isn’t available for all texture formats. |

## Objects for Packing

| **Property** | **Description** |
| --- | --- |
| **Packables** | The list of sprites, textures, and folders to pack into the sprite atlas.  To add an object for packing, either drag it from the **Project** window onto the **Objects for Packing** label, or select the **Add** (**+**) button.  To remove an object, select it in the list, then select the **Remove** (**-**) button.  For more information, refer to [Create a sprite atlas](create-sprite-atlas.html "create-sprite-atlas.html"). |
| **Pack Preview** | Combines the **Packables** objects into a sprite atlas, then displays a preview in the **Preview** window at the bottom of the **Inspector** window. |

## Preview window

If your sprites have normal map or mask map secondary textures, open the dropdown at the top-right of the **Preview** window to display the different sprite atlas textures.

## Additional resources

* [Sprite atlas best practices in Unity 6](https://www.youtube.com/watch?v=hXlpnwD-TgY "https://www.youtube.com/watch?v=hXlpnwD-TgY") on the Unity YouTube channel
* [2D game art, animation, and lighting for artists](https://unity.com/resources/2d-game-art-animation-lighting-unity-6-3-lts?isGated=false "https://unity.com/resources/2d-game-art-animation-lighting-unity-6-3-lts?isGated=false")

Upgrade Sprite Atlas V1 assets

Sprite asset reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/atlas/distribution/load-sprite-atlas-spriteatlasmanageratlasrequested.html

* [2D game development](../../../Unity2D.html "../../../Unity2D.html")
* [Sprites](../../../sprite/sprite-landing.html "../../../sprite/sprite-landing.html")
* [Packing sprites into atlas textures](../../../sprite/atlas/atlas-landing.html "../../../sprite/atlas/atlas-landing.html")
* Load sprite atlases manually at runtime

Create lower resolution versions of sprite atlases

Upgrade Sprite Atlas V1 assets

# Load sprite atlases manually at runtime

To avoid Unity loading sprite atlases and attaching them to your sprites when your project starts, load the sprite atlas yourself at runtime instead. This is called late binding.

For example, load a lower-resolution [variant sprite atlas](../master-variant/master-variant-sprite-atlases.html "../master-variant/master-variant-sprite-atlases.html") depending on the hardware, or load a set of sprites into memory only when a later game level needs it.

**Note:** To get a list of the sprites packed into a sprite atlas, for example if you need to manually instantiate sprites at runtime, use the `GetSprites` method of the `SpriteAtlas` API. For more information, refer to [SpriteAtlas.GetSprites](SpriteRef:U2D.SpriteAtlas.GetSprites "SpriteRef:U2D.SpriteAtlas.GetSprites").

## Exclude a sprite atlas from the build

To prevent Unity automatically including your sprite atlas in your build, follow these steps:

1. In the **Project** window, select the sprite atlas.
2. In the **Inspector** window, disable **Include in Build**.

**Important**: By default, this doesn’t affect the Scene view and Game view, because they continue to reference the `.spriteatlasv2` file in the **Project** window. However, if you enter Play mode or build your project, the sprites disappear, because they now reference the missing sprite atlas in the build.

## Load the sprite atlas at runtime

When you disable **Include in Build**, your sprites still reference the sprite atlas when your project starts, but the sprite atlas texture is missing. You must manually bind the sprite atlas when sprites request it.

Use one of the following methods:

* Load the sprite atlas from the [Resources system](../../../assets-resources-system.html "../../../assets-resources-system.html") and load it with the `Resources.Load` API.
* Load the sprite atlas from an [AssetBundle](../../../AssetBundlesIntro.html "../../../AssetBundlesIntro.html") and load it with the `AssetBundle` API.

### Load the sprite atlas from the Resources system

Follow these steps:

1. In the **Project** window, create a folder called **Resources**.
2. Move the sprite atlas asset into the **Resources** folder. Unity automatically includes assets from the **Resources** folder in the build, but doesn’t load them.
3. In a C# script, attach a new method to the `SpriteAtlasManager.atlasRequested` callback. The `atlasRequested` callback triggers when a sprite requests an unloaded sprite atlas. For example:

   ```
   void OnEnable()
   {
       SpriteAtlasManager.atlasRequested += MySpriteAtlasLoader;
   }
   ```
4. In the method, use the `Resources.Load` API to load the sprite atlas from the **Resources** folder and pass it back to Unity. For example:

   ```
   // Unity passes in the name of the sprite atlas that the sprite is requesting, and a callback to call
   void MySpriteAtlasLoader(string spriteAtlasName, System.Action<SpriteAtlas> callback)
   {
       // Load the sprite atlas
       var spriteAtlas = UnityEngine.Resources.Load<SpriteAtlas>(spriteAtlasName);

       // Pass the sprite atlas back to Unity
       callback(spriteAtlas);
   }
   ```

For more information, refer to [Use the Resources system to load assets at runtime](../../../assets-resources-system.html "../../../assets-resources-system.html").

For a complete example, refer to the Sprite Atlas Examples in the 2D Common package. For more information about package samples, refer to [The Package Manager window](../../../upm-ui.html "../../../upm-ui.html").

### Load the sprite atlas from an AssetBundle

Follow these steps:

1. Assign the sprite atlas to an AssetBundle. For more information, refer to [Assign assets to an AssetBundle](../../../assetbundles-assign-assets.html "../../../assetbundles-assign-assets.html").

   **Important:** To avoid duplicate sprites in your project, assign the sprites to the same AssetBundle. For more information, refer to [Avoiding asset duplication](../../../assets-avoid-duplication.html "../../../assets-avoid-duplication.html").

   **Note:** If you assign a sprite atlas to an AssetBundle but enable **Include in Build**, you don’t need to load the sprite atlas yourself at runtime. Unity loads the sprite atlas automatically.
2. In a C# script, attach a new method to the `SpriteAtlasManager.atlasRequested` callback. The `atlasRequested` callback triggers when a sprite requests an unloaded sprite atlas. For example:

   ```
   void OnEnable()
   {
       SpriteAtlasManager.atlasRequested += MySpriteAtlasLoader;
   }
   ```
3. In the method, use the `AssetBundle` API to load the sprite atlas from the AssetBundle and pass it back to Unity. For example:

   ```
   // Unity passes in the name of the sprite atlas that the sprite is requesting, and a callback to call
   void MySpriteAtlasLoader(string spriteAtlasName, System.Action<SpriteAtlas> callback)
   {
       // Load the sprite atlas from the AssetBundle
       var bundle = AssetBundle.LoadFromFile("path/to/assetbundle");
       var spriteAtlas = bundle.LoadAsset<SpriteAtlas>(spriteAtlasName);

       // Pass the sprite atlas back to Unity
       callback(spriteAtlas);
   }
   ```

For more information, refer to [Loading assets from AssetBundles](../../../AssetBundles-Native.html "../../../AssetBundles-Native.html").

For a complete example, refer to the Sprite Atlas Examples in the 2D Common package. For more information about package samples, refer to [The Package Manager window](../../../upm-ui.html "../../../upm-ui.html").

## Additional resources

* [Create lower resolution versions of sprite atlases](../master-variant/master-variant-sprite-atlases.html "../master-variant/master-variant-sprite-atlases.html")

Create lower resolution versions of sprite atlases

Upgrade Sprite Atlas V1 assets

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/atlas/v2/sprite-atlas-v2.html

* [2D game development](../../../Unity2D.html "../../../Unity2D.html")
* [Sprites](../../../sprite/sprite-landing.html "../../../sprite/sprite-landing.html")
* [Packing sprites into atlas textures](../../../sprite/atlas/atlas-landing.html "../../../sprite/atlas/atlas-landing.html")
* Upgrade Sprite Atlas V1 assets

Load sprite atlases manually at runtime

Sprite Atlas Inspector window reference

# Upgrade Sprite Atlas V1 assets

Up to Unity version 2022.2, Unity used a different format for sprite atlas assets called Sprite Atlas V1.

To upgrade Sprite Atlas V1 assets to Sprite Atlas V2 assets, follow these steps:

1. Make a backup of your V1 sprite atlas assets. You can’t convert V2 assets back to V1.
2. From the main menu, select **Edit** > **Project Settings**.
3. Select **Editor**.
4. In the **Sprite Atlas** section, set **Mode** to **Sprite Atlas V2 - Enabled**.

The **Inspector** window for a V2 sprite atlas is the same as a V1 sprite atlas. For more information, refer to [Sprite Atlas Inspector window reference](../sprite-atlas-reference.html "../sprite-atlas-reference.html").

## Additional resources

* [Create a sprite atlas](../create-sprite-atlas.html "../create-sprite-atlas.html")

Load sprite atlases manually at runtime

Sprite Atlas Inspector window reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/atlas/master-variant/master-variant-sprite-atlases.html

* [2D game development](../../../Unity2D.html "../../../Unity2D.html")
* [Sprites](../../../sprite/sprite-landing.html "../../../sprite/sprite-landing.html")
* [Packing sprites into atlas textures](../../../sprite/atlas/atlas-landing.html "../../../sprite/atlas/atlas-landing.html")
* Create lower resolution versions of sprite atlases

Create a sprite atlas

Load sprite atlases manually at runtime

# Create lower resolution versions of sprite atlases

To create lower resolution versions of the same sprite atlas for different platforms, create variant sprite atlases. A variant sprite atlas combines the same sprites and textures as the original sprite atlas, but the combined texture it creates has a lower resolution.

Follow these steps:

1. [Create a sprite atlas](../create-sprite-atlas.html "../create-sprite-atlas.html") as normal. Make sure its **Type** is set to **Master**. This sprite atlas is the parent sprite atlas.
2. Create another sprite atlas, then in its **Inspector** window set **Type** to **Variant**.
3. In the **Inspector** window of the variant sprite atlas, set **Master Atlas** to the parent sprite atlas you created in step 1. Either drag the parent sprite atlas from the **Project** window, or select the picker (**⊙**).

   A variant sprite atlas combines the same sprites and textures as the parent asset. It doesn’t have its own **Objects for Packing** list, and Unity doesn’t create a sprite atlas asset for it in the **Project** window.
4. To select the size of the combined texture of the variant sprite atlas, set the **Scale** property. For example, set **Scale** to 0.5 to create a sprite atlas texture half the resolution of the parent sprite atlas.
5. Select **Pack Preview** to display the packed texture in the **Preview** window at the bottom of the **Inspector** window.

## Use the variant sprite atlas

By default, Unity includes both the parent sprite atlas and the variant sprite atlas in your built project. This means Unity randomly chooses which sprite atlas to render with at runtime.

To avoid this, use any of the following approaches:

* To manually select a sprite atlas for a sprite, use the [SpriteAtlas.GetSprite](../../../../ScriptReference/U2D.SpriteAtlas.GetSprite.html "../../../../ScriptReference/U2D.SpriteAtlas.GetSprite.html") API.
* To manually control which sprite atlas Unity loads and uses, refer to [Load sprite atlases manually at runtime](../distribution/load-sprite-atlas-spriteatlasmanageratlasrequested.html "../distribution/load-sprite-atlas-spriteatlasmanageratlasrequested.html").
* To exclude the parent sprite atlas from the build, disable **Include in Build** in the **Inspector** window of the parent sprite atlas.

**Important**: If you disable **Include in Build** for both the parent sprite atlas and the variant sprite atlas, Unity includes no textures for the sprites and textures, and the sprites that use the texture are invisible.

## Additional resources

* [Sprite atlas best practices in Unity 6](https://www.youtube.com/watch?v=hXlpnwD-TgY "https://www.youtube.com/watch?v=hXlpnwD-TgY") on the Unity YouTube channel

Create a sprite atlas

Load sprite atlases manually at runtime

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/sprite-editor/custom-physics-shape-editor-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* [Sprite Editor window reference](../../sprite/sprite-editor/sprite-editor-window-reference-landing.html "../../sprite/sprite-editor/sprite-editor-window-reference-landing.html")
* Custom Physics Shape tab reference for the Sprite Editor window

Custom Outline tab reference for the Sprite Editor window

Secondary Textures tab reference for the Sprite Editor window

# Custom Physics Shape tab reference for the Sprite Editor window

Explore the properties you use to configure the geometry that Unity uses to detect if a sprite collides with another sprite. For more information, refer to [Create collision shapes for a sprite](create-collision-geometry "create-collision-geometry").

## Toolbar

The following properties appear in all the different tabs of the **Sprite Editor** window.

| **Property** | **Icon** | **Description** |
| --- | --- | --- |
| **Window name** | N/A | Sets the tab to display in the **Sprite Editor** window. The options are:  * **Sprite Editor**: Displays the [Sprite Editor](sprite-editor-window-reference.html "sprite-editor-window-reference.html") tab. * **Custom Outline**: Displays the [Custom Outline](custom-outline-editor-reference.html "custom-outline-editor-reference.html") tab. * **Custom Physics Shape**: Displays the [Custom Physics Shape](custom-physics-shape-editor-reference.html "custom-physics-shape-editor-reference.html") tab. * **Secondary Textures**: Displays the [Secondary Textures](secondary-textures-editor-reference.html "secondary-textures-editor-reference.html") tab. * **Skinning Editor**: Displays the **Skinning Editor** tab. For more information, refer to the [2D Animation package documentation](https://docs.unity3d.com/Packages/com.unity.2d.animation@latest/index?subfolder=/manual/index.html "https://docs.unity3d.com/Packages/com.unity.2d.animation@latest/index?subfolder=/manual/index.html"). |
| **Preview** | Preview icon | Previews your changes in the Scene view. |
| **Revert** | N/A | Discards your changes. |
| **Apply** | N/A | Saves your changes. |
| **Color** | Color icon | Toggles between displaying the color channels of the texture and its alpha channel. |
| **Zoom** | N/A | Sets the zoom level at which to display the texture. |
| **Mipmap level** | Mipmap level icons and slider | Sets the mipmap level of the texture to display. The slider ranges from the lowest resolution mipmap level on the left to the highest resolution mipmap level on the right. This property is available only if the texture has mipmap levels. |

## Main area

The main area of the **Sprite Editor** window displays the texture. Each individual sprite in the texture displays as a white outline, also known as a `SpriteRect`.

Left-click a sprite to select it.

![A detail from the Sprite Editor with a rock environment texture, sliced into four sprites. One sprite is selected.](../../../uploads/Main/sprite-editor_sprite-selected.jpg)


A detail from the Sprite Editor with a rock environment texture, sliced into four sprites. One sprite is selected.

Unity displays the following:

* **A**: The sprite area as a blue outline with filled circular handles.
* **B**: The border as a green outline with filled square handles.
* **C**: The pivot point as a hollow blue circle.

Select a sprite to display the collision geometry in white. Each square point is a vertex of a collision shape.

To edit a collision shape, do the following:

* To move a point, select and drag it.
* To add a point, click on an edge.
* To delete a point, select it and press **Delete**.
* To move an edge, hold **Ctrl** and select and drag the edge.

For more information, refer to [Create collision shapes for a sprite](create-collision-geometry "create-collision-geometry").

## Outline Tool

| **Property** | **Sub-property** | **Description** |
| --- | --- | --- |
| **Outline Detail** | N/A | Sets how detailed the outline of the collision geometry is. A higher value creates a more detailed outline that follows the shape of the sprite more closely, but also increases the number of vertices in the geometry, which can affect performance. |
| **Alpha Tolerance** | N/A | Sets the minimum alpha value for Unity to consider a pixel of the sprite as opaque. For example, if you set **Alpha Tolerance** to 128, Unity considers pixels with an alpha value of below 128 transparent. |
| **Snap** | N/A | Snaps the vertices to the nearest pixel. |
| **Generate** | N/A | Generates the collision geometry. To save the geometry, select **Apply** in the toolbar. |
| **Generate All** | N/A | Generates collision geometry for all the sprites in the texture that don’t already have collision geometry. This button is available only if you don’t select a sprite. |
| **Force Generate All** | N/A | Generates collision geometry for all the sprites in the texture, even if they already have collision geometry. This button is available only if you don’t select a sprite, and you select the checkbox next to **Generate All**. |
| **Copy** | N/A | Stores the current geometry. Unity removes the copy from the clipboard if you close the Sprite Editor window or select a different tab. |
| **Paste** | N/A | Retrieves the geometry you stored. To paste to a different sprite, select the destination sprite in the **Project** window first. If the position of a vertex is outside the sprite frame, Unity clamps the vertex position to inside the frame. This button is only available if you select **Copy** first. |
| **Paste All** | N/A | Retrieves the geometry you stored and applies it to all the sprites in the texture, regardless of which sprites are selected. If the position of a vertex is outside the area of a sprite, Unity clamps the vertex position to inside the area. This button is only available if you select **Copy** first. |
| **From Custom Outline** | N/A | Copies the shape from the **Custom Outline** tab. |
| N/A | **Paste** | Copies the shape from the **Custom Outline** tab to this sprite. |
| N/A | **Paste All** | Copies the shape from the **Custom Outline** tab to all the sprites in the texture, regardless of which sprites are selected. |

## Additional resources

* [Create collision shapes for a sprite](../create-collision-geometry.html "../create-collision-geometry.html")
* [2D Physics](../../2d-physics/2d-physics.html "../../2d-physics/2d-physics.html")

Custom Outline tab reference for the Sprite Editor window

Secondary Textures tab reference for the Sprite Editor window

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/sprite-editor/sprite-editor-window-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* [Sprite Editor window reference](../../sprite/sprite-editor/sprite-editor-window-reference-landing.html "../../sprite/sprite-editor/sprite-editor-window-reference-landing.html")
* Sprite Editor tab reference for the Sprite Editor window

Sprite Editor window reference

Custom Outline tab reference for the Sprite Editor window

# Sprite Editor tab reference for the Sprite Editor window

Explore the properties and settings you use to configure sprites and convert a texture into multiple sprites.

**Note:** This page is about the default **Sprite Editor** tab in the **Sprite Editor** window. For information about other tabs such as **Custom Outline** and **Skinning Editor**, refer to [Sprite Editor window reference](sprite-editor-window-reference-landing.html "sprite-editor-window-reference-landing.html").

**Note:** If the **Sprite Mode** of the texture is set to **Polygon**, the tab is called the **Sprite Polygon Mode Editor** tab.

## Toolbar

The following properties appear in all the different tabs of the **Sprite Editor** window.

| **Property** | **Icon** | **Description** |
| --- | --- | --- |
| **Window name** | N/A | Sets the tab to display in the **Sprite Editor** window. The options are:  * **Sprite Editor**: Displays the [Sprite Editor](sprite-editor-window-reference.html "sprite-editor-window-reference.html") tab. * **Custom Outline**: Displays the [Custom Outline](custom-outline-editor-reference.html "custom-outline-editor-reference.html") tab. * **Custom Physics Shape**: Displays the [Custom Physics Shape](custom-physics-shape-editor-reference.html "custom-physics-shape-editor-reference.html") tab. * **Secondary Textures**: Displays the [Secondary Textures](secondary-textures-editor-reference.html "secondary-textures-editor-reference.html") tab. * **Skinning Editor**: Displays the **Skinning Editor** tab. For more information, refer to the [2D Animation package documentation](https://docs.unity3d.com/Packages/com.unity.2d.animation@latest/index?subfolder=/manual/index.html "https://docs.unity3d.com/Packages/com.unity.2d.animation@latest/index?subfolder=/manual/index.html"). |
| **Preview** | Preview icon | Previews your changes in the Scene view. |
| **Revert** | N/A | Discards your changes. |
| **Apply** | N/A | Saves your changes. |
| **Color** | Color icon | Toggles between displaying the color channels of the texture and its alpha channel. |
| **Zoom** | N/A | Sets the zoom level at which to display the texture. |
| **Mipmap level** | Mipmap level icons and slider | Sets the mipmap level of the texture to display. The slider ranges from the lowest resolution mipmap level on the left to the highest resolution mipmap level on the right. This property is available only if the texture has mipmap levels. |

### Sprite Editor toolbar

The following options appear only in the **Sprite Editor** tab of the Sprite Editor window.

| **Property** | **Icon** | **Description** |
| --- | --- | --- |
| **Change Shape** | N/A | Hides or reveals the **Sides** overlay in the main area. This button is available only if the **Sprite Mode** of the texture is set to **Polygon**. For more information, refer to the [Main area](#main-area "#main-area") section. |
| **Slice** | N/A | Enables the **Slice** overlay that allows you to automatically slice a texture into multiple sprites. This option is available only if you set the **Sprite Mode** of the texture to **Multiple**. For more information, refer to the [Slice overlay](#slice-overlay "#slice-overlay") section. |
| **Trim** | N/A | Resizes the selected sprite so it fits tightly around the edge of the opaque part of the texture. This property is available only if the **Sprite Mode** of the texture is set to **Multiple**. |
| **Locks** | Locks icon | Locks editing the properties of all the sprites. The options are:  * **Name**: Locks or unlocks editing the names of sprites. * **Size**: Locks or unlocks editing the size of sprites. * **Position**: Locks or unlocks editing the positions of sprites. * **Border**: Locks or unlocks editing the borders of sprites. * **Create/Delete**: Locks or unlocks creating and deleting sprites.  This property is available only if you set the **Sprite Mode** of the texture to **Multiple**. |

## Slice overlay

Select the **Slice** overlay to display and set the properties for [creating multiple sprites from a single texture](use-editor.html#create-multiple-sprites "use-editor.html#create-multiple-sprites").

| **Property** | **Description** |
| --- | --- |
| **Slice on Import** | Slices the texture again automatically when it changes externally and Unity reimports it. If you enable this property, the recommended best practice is to set **Method** to either **Smart** or **Safe**, to make sure Unity keeps existing sprites. |
| **Type** | Selects the slicing method. The options are:  * **Automatic**: Slices based on the transparency of the texture. Use this option if each image in the texture is separated by transparent pixels. * **Grid By Cell Size**: Slices into sprites of equal size. * **Grid By Cell Count**: Slices into a specific number of rows and columns. * **Isometric Grid**: Slices into isometric diamond-shaped sprites instead of rectangular sprites. |
| **Column & Row** | Sets the number of rows and columns in the sliced texture. This property is available only if you set **Type** to **Grid By Cell Count**. |
| **Pixel Size** | Sets the width and height of each sprite in pixels. This property is available only if you set **Type** to **Grid By Cell Size** or **Isometric Grid**. |
| **Offset** | Adjusts the sprite grid along the x-axis and y-axis. This property is available only if you set **Type** to an option other than **Automatic**. |
| **Padding** | Sets the amount of space to add between sprites in pixels. This property is available only if you set **Type** to **Grid By Cell Size** or **Grid By Cell Count**. |
| **Keep Empty Rects** | Keeps sprites that have no opaque pixels. Use this option to organize sprites based on their position in the texture. This property is available only if you set **Type** to an option other than **Automatic**. |
| **Is Alternate** | If you set **Type** to **Isometric Grid**, this property staggers the isometric diamonds across alternate rows. Unity assumes the first diamond in the top row starts half a pixel from the left side. |
| **Pivot** | Sets the position of the points Unity uses for transformations such as rotation. Select **Custom** to set a custom pivot point. |
| **Pivot Unit Mode** | Sets the units the **Custom Pivot** parameter uses. The options are:  * **Normalized**: The values range from 0, 0 at the bottom-left of the sprite to 1, 1 at the top-right of the sprite. * **Pixels**: The values are in pixels, and range from 0, 0 at the bottom-left of the sprite. |
| **Custom Pivot** | Sets the positions of the pivot point if you set **Pivot** to **Custom**. Right-click on the **Custom Pivot** label to copy or paste values. |
| **Method** | Keeps or deletes the existing sprites when you select **Slice**. The options are:  * **Delete Existing**: Deletes the existing sprites then adds the new sprites. * **Smart**: For each new sprite, checks if it overlaps any existing sprites. If it overlaps, Unity ignores the new sprite, but uses its position and size for the best existing overlapping sprite. * **Safe**: Keeps all the original sprites, and ignores any new sprites that overlap an existing sprite. |
| **Slice** | Slices the texture according to the settings. |

## Main area

The main area of the **Sprite Editor** window displays the texture. Each individual sprite in the texture displays as a white outline, also known as a `SpriteRect`.

Left-click a sprite to select it.

![A detail from the Sprite Editor with a rock environment texture, sliced into four sprites. One sprite is selected.](../../../uploads/Main/sprite-editor_sprite-selected.jpg)


A detail from the Sprite Editor with a rock environment texture, sliced into four sprites. One sprite is selected.

Unity displays the following:

* **A**: The sprite area as a blue outline with filled circular handles.
* **B**: The border as a green outline with filled square handles.
* **C**: The pivot point as a hollow blue circle.

## Polygon texture properties

Unity displays the following properties if the **Sprite Mode** of the texture is set to **Polygon**.

| **Property** | **Description** |
| --- | --- |
| **Sides** | The number of sides the polygon has. To change the number of sides, enter a new value and select **Change**. This property is available only if the **Sprite Mode** of the texture is set to **Polygon**. |
| **Change** | Updates the polygon to have the number of sides set in **Sides**. |

## Sprite overlay

Select a sprite to display and set its properties in the **Sprite** overlay.

| **Property** | **Description** |
| --- | --- |
| **Name** | Sets the name of the sprite. |
| **Position** | Sets the area of the texture to use as the sprite. The properties are:  * **X**: The x coordinate of the left of the sprite in pixels. * **Y**: The y coordinate of the bottom of the sprite in pixels. * **W**: The width of the sprite in pixels. * **H**: The height of the sprite in pixels. |
| **Border** | Sets the border to use for [9-slicing](../9-slice/9-slice-landing.html "../9-slice/9-slice-landing.html"). Unity displays the border as a green outline in the Scene view. The properties are:  * **L**: The width of the left border in pixels. * **R**: The width of the right border in pixels. * **T**: The height of the top border in pixels. * **B**: The height of the bottom border in pixels. |
| **Pivot** | Sets the position of the point Unity uses for transformations such as rotation. Select **Custom** to set a custom pivot point. |
| **Pivot Unit Mode** | Sets the units the **Custom Pivot** parameter uses. The options are:  * **Normalized**: The values range from 0, 0 at the bottom-left of the sprite to 1, 1 at the top-right of the sprite. * **Pixels**: The values are in pixels, and range from 0, 0 at the bottom-left of the sprite. |
| **Custom Pivot** | Sets the positions of the pivot point if you set **Pivot** to **Custom**. The units depend on **Pivot Unit Mode**. Right-click on the **Custom Pivot** label to copy or paste values. |

## Additional resources

* [Create sprites from a texture](use-editor.html "use-editor.html")

Sprite Editor window reference

Custom Outline tab reference for the Sprite Editor window

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/sprite-editor/generate-outline.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* Crop a sprite

Cut out sprites from a texture

Create collision shapes for a sprite

# Crop a sprite

Unity renders a sprite on a mesh. To crop the mesh to a different shape, use the **Custom Outline** tab of the **Sprite Editor** window.

You can use the Custom Outline tab to do the following:

* Remove transparent pixels from the mesh, to improve performance by reducing the number of unneeded pixels Unity renders.
* Crop a sprite to a custom shape.

## Open the Custom Outline tab of the Sprite Editor

Follow these steps:

1. In the **Hierarchy** window, select the sprite GameObject.
2. In the **Inspector** window, in the **Sprite Renderer** component, select **Open Sprite Editor**.
3. Select the **Custom Outline** tab in the top-left dropdown. Unity displays the **Outline Tools** overlay.

## Remove transparent pixels from the mesh

Follow these steps in the **Custom Outline** tab:

1. Select **Generate** to automatically generate a mesh that follows the opaque parts of the sprite. Unity displays the outline of the mesh in white. Each point is a vertex of the mesh.
2. Edit the outline if needed. For more information, refer to the [Edit an outline](#edit-an-outline "#edit-an-outline") section.
3. To save the shape, select **Apply** in the toolbar. Unity now renders only the area within the outline.

To change how closely the outline follows the opaque parts of the sprite. adjust the **Outline Detail** and **Alpha Tolerance** properties, then regenerate the mesh.

For more information, refer to [Custom Outline tab reference for the Sprite Editor window](custom-outline-editor-reference.html "custom-outline-editor-reference.html").

![Left: An automatically generated mesh outline with a low Outline Detail value. Right: An automatically generated mesh outline with a higher Outline Detail value.](../../../uploads/Main/2DCustomOutline_7.png)


Left: An automatically generated mesh outline with a low **Outline Detail** value. Right: An automatically generated mesh outline with a higher **Outline Detail** value.

## Crop a sprite to a custom shape

Do the following in the **Custom Outline** tab:

1. To create an outline, click and drag a rectangle. You can also follow the steps in the previous section to generate an outline.

   You can add multiple outlines to the same sprite.
2. Edit the outline. For more information, refer to the [Edit an outline](#edit-an-outline "#edit-an-outline") section.
3. To save the shape, select **Apply** in the toolbar. Unity now renders only the area within the outline.

## Edit an outline

To edit an outline, do the following:

* To move a point, select and drag it.
* To add a point, click on an edge.
* To delete a point, select it and press **Delete**.
* To move an edge, hold **Ctrl** and select and drag the edge.

To save the new outline, select **Apply** in the toolbar.

## Additional resources

* [Custom Outline tab reference for the Sprite Editor window](custom-outline-editor-reference.html "custom-outline-editor-reference.html")
* [Create sprites from a texture](../sprite-editor/use-editor.html "../sprite-editor/use-editor.html")

Cut out sprites from a texture

Create collision shapes for a sprite

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/sprite-editor/use-editor.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* Cut out sprites from a texture

Import a sprite or spritesheet texture

Crop a sprite

# Cut out sprites from a texture

To cut out sprites from a texture, use the default **Sprite Editor** tab of the **Sprite Editor** window.

For each sprite, Unity creates a sprite asset () as a child of the texture in the **Project** window.

## Open the Sprite Editor

Follow these steps:

1. In the **Project** window, select the texture you want to edit.

   **Note**: You can’t edit a sprite by selecting it in the **Scene** view.
2. In the **Inspector** window, make sure the **Texture Type** is set to **Sprite (2D and UI)**.
3. Select **Sprite Editor**.

## Adjust the area of a single sprite

If the **Sprite Mode** of the texture is set to **Single**, the entire texture is a single sprite. To adjust the sprite in the **Sprite Editor** window, follow these steps:

1. Select the texture. Unity displays a rectangular selection area with handles in the corners. This is the sprite area, also known as a `SpriteRect`.
2. Drag the blue handles or edges to set the area of the sprite.
3. Configure the properties of the sprite using the **Sprite** overlay. For more information, refer to [Sprite Editor tab reference](sprite-editor-window-reference.html#sprite-overlay "sprite-editor-window-reference.html#sprite-overlay").
4. To save the sprite, select **Apply** in the toolbar.

## Cut out multiple sprites from a single texture

If the **Sprite Mode** of the texture is set to **Multiple**, the texture can contain multiple sprites. Each sprite is defined by a `SpriteRect` that you create in the **Sprite Editor** window.

Do either of the following in the **Sprite Editor** window:

* Manually select areas to use as sprites.
* Slice into sprites automatically, for example from a sprite sheet that uses a regular layout, or transparent pixels to separate each image.

### Manually select areas to use as sprites

Follow these steps:

1. Left-click the texture and drag to create a `SpriteRect`.
2. Repeat step 1 to create more sprites.
3. To save the sprites, select **Apply** in the toolbar.

### Slice into sprites automatically

To slice a texture into multiple sprites automatically, select the **Slice** dropdown in the toolbar.

Choose from the following slicing methods:

* **Automatic** to slice based on the transparency of the texture. Use this option if each image in the texture is separated by transparent pixels.
* **Grid By Cell Size** to slice into sprites of equal size.
* **Grid By Cell Count** to slice into a specific number of rows and columns.
* **Isometric Grid** to slice into isometric diamond-shaped sprites instead of rectangular sprites.

When you select an option other than **Automatic** or adjust the settings in the **Slice** overlay, Unity displays a preview of the sprites as red outlines. Unity might not display the outlines if you already sliced the texture.

After you select **Slice** to apply the slicing method, to adjust a generated sprite, select it then drag its blue handles or edges.

For more information, refer to [Sprite Editor tab reference](sprite-editor-window-reference.html#slice-overlay "sprite-editor-window-reference.html#slice-overlay").

## Warn before applying or reverting changes

To make Unity display a warning when you select **Revert** or **Apply** in the Sprite Editor, follow these steps:

1. From the main menu, select **Edit** > **Preferences**.
2. Select **2D > Sprite Editor Window**.
3. Enable **Show Apply Confirmation** or **Show Revert Confirmation**.

## Additional resources

* [Sprite Editor tab reference](sprite-editor-window-reference.html "sprite-editor-window-reference.html")
* [Sprite asset reference](../../class-Sprite.html "../../class-Sprite.html")

Import a sprite or spritesheet texture

Crop a sprite

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/sprite-editor/secondary-textures-editor-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* [Sprite Editor window reference](../../sprite/sprite-editor/sprite-editor-window-reference-landing.html "../../sprite/sprite-editor/sprite-editor-window-reference-landing.html")
* Secondary Textures tab reference for the Sprite Editor window

Custom Physics Shape tab reference for the Sprite Editor window

2D Profiler module reference

# Secondary Textures tab reference for the Sprite Editor window

Explore the properties you use to add secondary textures to a sprite texture, for example normal maps or lighting mask maps. For more information, refer to [Add a normal map or a mask map to a sprite in URP](../../urp/SecondaryTextures.html "../../urp/SecondaryTextures.html").

## Toolbar

The following properties appear in all the different tabs of the **Sprite Editor** window.

| **Property** | **Icon** | **Description** |
| --- | --- | --- |
| **Window name** | N/A | Sets the tab to display in the **Sprite Editor** window. The options are:  * **Sprite Editor**: Displays the [Sprite Editor](sprite-editor-window-reference.html "sprite-editor-window-reference.html") tab. * **Custom Outline**: Displays the [Custom Outline](custom-outline-editor-reference.html "custom-outline-editor-reference.html") tab. * **Custom Physics Shape**: Displays the [Custom Physics Shape](custom-physics-shape-editor-reference.html "custom-physics-shape-editor-reference.html") tab. * **Secondary Textures**: Displays the [Secondary Textures](secondary-textures-editor-reference.html "secondary-textures-editor-reference.html") tab. * **Skinning Editor**: Displays the **Skinning Editor** tab. For more information, refer to the [2D Animation package documentation](https://docs.unity3d.com/Packages/com.unity.2d.animation@latest/index?subfolder=/manual/index.html "https://docs.unity3d.com/Packages/com.unity.2d.animation@latest/index?subfolder=/manual/index.html"). |
| **Preview** | Preview icon | Previews your changes in the Scene view. |
| **Revert** | N/A | Discards your changes. |
| **Apply** | N/A | Saves your changes. |
| **Color** | Color icon | Toggles between displaying the color channels of the texture and its alpha channel. |
| **Zoom** | N/A | Sets the zoom level at which to display the texture. |
| **Mipmap level** | Mipmap level icons and slider | Sets the mipmap level of the texture to display. The slider ranges from the lowest resolution mipmap level on the left to the highest resolution mipmap level on the right. This property is available only if the texture has mipmap levels. |

## Main area

The main area of the **Sprite Editor** window displays the texture. Each individual sprite in the texture displays as a white outline, also known as a `SpriteRect`.

Left-click a sprite to select it.

![A detail from the Sprite Editor with a rock environment texture, sliced into four sprites. One sprite is selected.](../../../uploads/Main/sprite-editor_sprite-selected.jpg)


A detail from the Sprite Editor with a rock environment texture, sliced into four sprites. One sprite is selected.

Unity displays the following:

* **A**: The sprite area as a blue outline with filled circular handles.
* **B**: The border as a green outline with filled square handles.
* **C**: The pivot point as a hollow blue circle.

To display a secondary texture in the **Sprite Editor** window, select it in the **Secondary Textures** overlay. To display the sprite texture again, select anywhere outside of the overlay.

## Secondary Textures overlay

| **Property** | **Description** |
| --- | --- |
| **Add** (**+**) | Adds a secondary texture. The maximum number of secondary textures is 8. |
| **Remove** (**-**) | Removes a secondary texture. Select a secondary texture to highlight it, then select **Remove**. |
| **Name** | Sets the name of the secondary texture. To add a normal map or a lighting mask map, select **\_NormalMap** or **\_MaskTex** from the dropdown. **Note:** The dropdown might include names used by Unity packages you installed, even if you have since uninstalled the packages.  For more information about adding a normal map of a lighting mask map, refer to [Add a normal map or a mask map to a sprite in URP](../../urp/SecondaryTextures.html "../../urp/SecondaryTextures.html"). |
| **Texture** | Sets the texture to use as the secondary texture. Drag a texture from the **Project** window, or select the picker (**⊙**). To save the texture, select **Apply** in the toolbar. |

## Additional resources

* [Add normal map and mask textures to a sprite in URP](../../urp/SecondaryTextures.html "../../urp/SecondaryTextures.html")
* [Sprite Editor window reference](sprite-editor-window-reference-landing.html "sprite-editor-window-reference-landing.html")

Custom Physics Shape tab reference for the Sprite Editor window

2D Profiler module reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/sprite-editor/custom-outline-editor-reference.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* [Sprite Editor window reference](../../sprite/sprite-editor/sprite-editor-window-reference-landing.html "../../sprite/sprite-editor/sprite-editor-window-reference-landing.html")
* Custom Outline tab reference for the Sprite Editor window

Sprite Editor tab reference for the Sprite Editor window

Custom Physics Shape tab reference for the Sprite Editor window

# Custom Outline tab reference for the Sprite Editor window

Explore the properties you use to configure the shape of the mesh that renders a sprite. For more information, refer to [Crop a sprite](generate-outline.html "generate-outline.html").

## Toolbar

The following properties appear in all the different tabs of the **Sprite Editor** window.

| **Property** | **Icon** | **Description** |
| --- | --- | --- |
| **Window name** | N/A | Sets the tab to display in the **Sprite Editor** window. The options are:  * **Sprite Editor**: Displays the [Sprite Editor](sprite-editor-window-reference.html "sprite-editor-window-reference.html") tab. * **Custom Outline**: Displays the [Custom Outline](custom-outline-editor-reference.html "custom-outline-editor-reference.html") tab. * **Custom Physics Shape**: Displays the [Custom Physics Shape](custom-physics-shape-editor-reference.html "custom-physics-shape-editor-reference.html") tab. * **Secondary Textures**: Displays the [Secondary Textures](secondary-textures-editor-reference.html "secondary-textures-editor-reference.html") tab. * **Skinning Editor**: Displays the **Skinning Editor** tab. For more information, refer to the [2D Animation package documentation](https://docs.unity3d.com/Packages/com.unity.2d.animation@latest/index?subfolder=/manual/index.html "https://docs.unity3d.com/Packages/com.unity.2d.animation@latest/index?subfolder=/manual/index.html"). |
| **Preview** | Preview icon | Previews your changes in the Scene view. |
| **Revert** | N/A | Discards your changes. |
| **Apply** | N/A | Saves your changes. |
| **Color** | Color icon | Toggles between displaying the color channels of the texture and its alpha channel. |
| **Zoom** | N/A | Sets the zoom level at which to display the texture. |
| **Mipmap level** | Mipmap level icons and slider | Sets the mipmap level of the texture to display. The slider ranges from the lowest resolution mipmap level on the left to the highest resolution mipmap level on the right. This property is available only if the texture has mipmap levels. |

## Outline Tool

| **Property** | **Sub-property** | **Description** |
| --- | --- | --- |
| **Outline Detail** | N/A | Sets how detailed the outline of the mesh is. A higher value creates a more detailed outline that follows the shape of the sprite more closely, but also increases the number of vertices in the mesh, which can affect performance. |
| **Alpha Tolerance** | N/A | Sets the minimum alpha value for Unity to consider a pixel of the sprite as opaque. For example, if you set **Alpha Tolerance** to 128, Unity considers pixels with an alpha value of below 128 transparent. |
| **Snap** | N/A | Snaps the vertices to the nearest pixel. |
| **Generate** | N/A | Generates the shape of the mesh. To save the shape, select **Apply** in the toolbar. |
| **Generate All** | N/A | Generates shapes for all the sprites in the texture that don’t already have a mesh shape. This button is available only if you don’t select a sprite. |
| **Force Generate All** | N/A | Generates shapes for all the sprites in the texture, even if they already have a mesh shape. This button is available only if you don’t select a sprite, and you select the checkbox next to **Generate All**. |
| **Copy** | N/A | Stores the current shape. Unity removes the copy from the clipboard if you close the Sprite Editor window or select a different tab. |
| **Paste** | N/A | Retrieves the shape you stored. To paste to a different sprite, select the destination sprite in the **Project** window first. If the position of a vertex is outside the sprite frame, Unity clamps the vertex position to inside the frame. This button is only available if you select **Copy** first. |
| **Paste All** | N/A | Retrieves the shape you stored and applies it to all the sprites in the texture, regardless of which sprites are selected. If the position of a vertex is outside the area of a sprite, Unity clamps the vertex position to inside the area. This button is only available if you select **Copy** first. |
| **From Physics Shape** | N/A | Copies the shape from the **Custom Physics Shape** tab. |
| N/A | **Paste** | Copies the shape from the **Custom Physics Shape** tab to this sprite. |
| N/A | **Paste All** | Copies the shape from the **Custom Physics Shape** tab to all the sprites in the texture, regardless of which sprites are selected. |

## Main area

The main area of the **Sprite Editor** window displays the texture. Each individual sprite in the texture displays as a white outline, also known as a `SpriteRect`.

Left-click a sprite to select it.

![A detail from the Sprite Editor with a rock environment texture, sliced into four sprites. One sprite is selected.](../../../uploads/Main/sprite-editor_sprite-selected.jpg)


A detail from the Sprite Editor with a rock environment texture, sliced into four sprites. One sprite is selected.

Unity displays the following:

* **A**: The sprite area as a blue outline with filled circular handles.
* **B**: The border as a green outline with filled square handles.
* **C**: The pivot point as a hollow blue circle.

Select a sprite to display the mesh shape in white. Each square point is a vertex of the mesh that renders the sprite.

To edit the mesh shape, do the following:

* To move a point, select and drag it.
* To add a point, click on an edge.
* To delete a point, select it and press **Delete**.
* To move an edge, hold **Ctrl** and select and drag the edge.

For more information, refer to [Crop a sprite](generate-outline.html "generate-outline.html").

## Additional resources

* [Crop a sprite](generate-outline.html "generate-outline.html")
* [Custom Physics Shape tab reference for the Sprite Editor window](custom-physics-shape-editor-reference.html "custom-physics-shape-editor-reference.html")

Sprite Editor tab reference for the Sprite Editor window

Custom Physics Shape tab reference for the Sprite Editor window

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/sprite/sprite-editor/sprite-editor-window-reference-landing.html

* [2D game development](../../Unity2D.html "../../Unity2D.html")
* [Sprites](../../sprite/sprite-landing.html "../../sprite/sprite-landing.html")
* Sprite Editor window reference

Sprite Renderer component reference

Sprite Editor tab reference for the Sprite Editor window

# Sprite Editor window reference

Explore the properties and settings you use to create sprites from a texture, edit the meshes Unity uses to render the sprite and detect collisions, and rig a sprite for animation.

| **Topic** | **Description** |
| --- | --- |
| [Sprite Editor tab reference](sprite-editor-window-reference.html "sprite-editor-window-reference.html") | Explore the properties you use to configure sprites and convert a texture into multiple sprites. |
| [Custom Outline tab reference](custom-outline-editor-reference.html "custom-outline-editor-reference.html") | Explore the properties you use to configure the shape of the mesh that renders a sprite. |
| [Custom Physics Shape tab reference](custom-physics-shape-editor-reference.html "custom-physics-shape-editor-reference.html") | Explore the properties you use to configure the mesh shape that Unity uses to detect if a sprite collides with another sprite. |
| [Secondary Textures tab reference](secondary-textures-editor-reference.html "secondary-textures-editor-reference.html") | Explore the properties you use to add secondary textures to a sprite texture, for example normal maps or lighting mask maps. |

## Additional resources

* [Skinning Editor](https://docs.unity3d.com/Packages/com.unity.2d.animation@latest/index.html?subfolder=/manual/SkinningEditor.html "https://docs.unity3d.com/Packages/com.unity.2d.animation@latest/index.html?subfolder=/manual/SkinningEditor.html")

Sprite Renderer component reference

Sprite Editor tab reference for the Sprite Editor window

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-debug-drawing.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Creating a scene with the Physics Core 2D API](../2d-physics-api/2d-physics-api-create-objects-landing.html "../2d-physics-api/2d-physics-api-create-objects-landing.html")
* Draw a debug visualization of Physics Core 2D API objects

Move a GameObject with the Physics Core 2D API

Combine Physics Core 2D API shapes

# Draw a debug visualization of Physics Core 2D API objects

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

To help you visualize 2D physics objects during development, Unity automatically draws the shapes you create with the Physics Core 2D API.

Unity draws the shapes automatically in the Unity Editor. You can also enable Unity drawing the shapes in builds.

![An image from the sandbox demo of the PhysicsCore2D repository on GitHub. Thousands of tiny multi-colored capsules are scattered around an area dotted with 2D shapes, with boundaries represented by gray boxes.](../../uploads/Main/2d-physics-api-debug-draw.png)


An image from the sandbox demo of the PhysicsCore2D repository on GitHub. Thousands of tiny multi-colored capsules are scattered around an area dotted with 2D shapes, with boundaries represented by gray boxes.

## Configure debug drawing

Unity draws your shapes automatically in the Scene view, the Game view, and when you enter Play mode.

To configure debug drawing, follow these steps:

1. Select the GameObject with a public `PhysicsWorldDefinition` component. For more information, refer to [Create a physics world](2d-physics-api-world.html "2d-physics-api-world.html").
2. In the **Inspector** window, configure the properties that start with `Draw`. For example `Draw Options` selects which features to draw, and `Draw Colors` sets the colors Unity uses.

To set a different color for a specific shape, follow these steps:

1. Select a GameObject with a public `PhysicsShapeDefinition` component. For more information, refer to [Create a physics object](2d-physics-api-physics-object.html "2d-physics-api-physics-object.html").
2. In the **Inspector** window, set **Custom Color**.

To configure the properties in your C# script instead, adjust the similarly named properties of your [`PhysicsWorldDefinition`](../../ScriptReference/Unity.U2D.Physics.PhysicsWorldDefinition.html "../../ScriptReference/Unity.U2D.Physics.PhysicsWorldDefinition.html"), [`PhysicsBodyDefinition`](../../ScriptReference/Unity.U2D.Physics.PhysicsBodyDefinition.html "../../ScriptReference/Unity.U2D.Physics.PhysicsBodyDefinition.html"), or [`PhysicsShapeDefinition`](../../ScriptReference/Unity.U2D.Physics.PhysicsShapeDefinition.html "../../ScriptReference/Unity.U2D.Physics.PhysicsShapeDefinition.html") objects.

## Enable debug drawing in a development build

To draw in a build, follow these steps:

1. Make sure your target build platform supports [compute shaders](../class-ComputeShader-introduction.html "../class-ComputeShader-introduction.html").
2. Create and assign a Physics Core Settings 2D asset. For more information, refer to [Configure global 2D physics settings](../class-PhysicsCoreSettings2D.html "../class-PhysicsCoreSettings2D.html").
3. In the **Project Settings** window, select **PhysicsCore 2D** > **Settings**.
4. Set **Rendering Mode** to **Development Player** or **Any Player**.

## Draw your own shapes

To draw your own shapes, use the `Draw` methods of the [world object](../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.html "../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.html"). For example:

```
// Get the main physics world.
PhysicsWorld world = PhysicsWorld.defaultWorld;

// Draw a line from the origin to (30, 40) in "cornflower blue".
world.DrawLine(Vector2.zero, new Vector2(30f, 40f), Color.cornflowerBlue);

// Draw a circle from the origin to (30, 40) in "forest green".
world.DrawCircle(new Vector2(30f, 40f), 2f, Color.forestGreen);

// Draw a point with a 3 pixel radius at (-5, 10) in "gold".
world.DrawPoint(new Vector2(-5f, 10f), 3f, Color.gold);
```

Shapes only last for one frame. To draw them for longer, use the lifetime property.

```
// Set lifetime as 5 seconds.
const float lifeTime = 5f;

// Draw a circle at a specific position in blue for 5 seconds.
world.DrawGeometry(circleGeometry, physicsTransform, Color.cornflowerBlue, lifeTime);
```

## Additional resources

* [Creating physics objects with the Physics Core 2D API](2d-physics-api-create-objects-landing.html "2d-physics-api-create-objects-landing.html")
* [PhysicsCore2D repository](https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master "https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master") on GitHub
* [World definition reference for the Physics Core 2D API](2d-physics-api-reference-world.html "2d-physics-api-reference-world.html")
* [PhysicsCore 2D reference](../class-PhysicsCore2DProjectSettings.html "../class-PhysicsCore2DProjectSettings.html")

Move a GameObject with the Physics Core 2D API

Combine Physics Core 2D API shapes

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-introduction.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Get started with the Physics Core 2D API](../2d-physics-api/2d-physics-api-get-started-landing.html "../2d-physics-api/2d-physics-api-get-started-landing.html")
* Introduction to the Physics Core 2D API

Get started with the Physics Core 2D API

Physics Core 2D API workflow

# Introduction to the Physics Core 2D API

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

The Physics Core 2D API lets you create and control 2D physics objects in C# scripts. The API is based on version 3 of the [Box2D physics system](https://box2d.org "https://box2d.org").

The API doesn’t interact with or affect the built-in Unity 2D physics components such as Rigidbody 2D and Collider 2D. The two systems are separate.

## Requirements

The API works on platforms that support compute shaders.

The API is compatible with the Universal Render Pipeline (URP), the High Definition Render Pipeline (HDRP), and the Built-In Render Pipeline.

## About the API

The API has the following advantages over the [standard 2D physics components](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") such as Rigidbody 2D and Collider 2D:

* Create physics in your scene with or without using GameObjects. You can create an unlimited number of objects, and create batches of multiple objects.
* Performance is better, because Unity stores data contiguously in memory, and the simulation runs on up to 64 CPU cores simultaneously.
* The system is more deterministic, so you get the same results each time you run the simulation.
* The API supports using [64 layers](2d-physics-api-collisions-enable.html#use-up-to-64-layers "2d-physics-api-collisions-enable.html#use-up-to-64-layers") for collision detection, instead of the standard 32.
* Most APIs are thread-safe, so you can use the [job system](../job-system.html "../job-system.html") to run physics code on multiple threads.
* The API returns objects as structs, so you can use them in Unity’s [Data-Oriented Technology Stack (DOTS)](https://unity.com/dots "https://unity.com/dots").

The API lets you do the following for example:

* [Combine shapes](2d-physics-api-connect-combine-shapes.html "2d-physics-api-connect-combine-shapes.html") into your own physics shapes, for example a gear with teeth.
* Create multiple, isolated physics worlds in the same scene that run in parallel.
* [Run 2D physics in 3D space](2d-physics-api-3d-planes.html "2d-physics-api-3d-planes.html"), for example to create a 2D world that lies flat on the ground.
* Use multiple threads to [cast rays](2d-physics-api-raycasting.html "2d-physics-api-raycasting.html") that query intersections and overlaps.

There are no built-in components. You create physics objects directly in your scene. However you can use the API to expose sets of properties in the **Inspector** window of the Unity Editor that act like components. This allows you to configure properties similarly to Rigidbody 2D and Collider 2D components.

## Debug drawing

The Physics Core 2D API automatically draws a debug visualization of physics objects in the Scene view, Game view, and in development builds. You can also draw your own debug shapes. For more information, refer to [Draw a debug visualization of Physics Core 2D API objects](2d-physics-api-debug-drawing.html "2d-physics-api-debug-drawing.html").

![An image from the sandbox demo of the PhysicsCore2D repository on GitHub. Thousands of tiny multi-colored capsules are scattered around an area dotted with 2D shapes, with boundaries represented by gray boxes.](../../uploads/Main/2d-physics-api-debug-draw.png)


An image from the sandbox demo of the PhysicsCore2D repository on GitHub. Thousands of tiny multi-colored capsules are scattered around an area dotted with 2D shapes, with boundaries represented by gray boxes.

## Example projects

For example projects that use the Physics Core 2D API, refer to the [PhysicsCore2D repository](https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master "https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master") on GitHub.

## Additional resources

* [PhysicsCore2D repository](https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master "https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master") on GitHub

Get started with the Physics Core 2D API

Physics Core 2D API workflow

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-destroy.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Creating a scene with the Physics Core 2D API](../2d-physics-api/2d-physics-api-create-objects-landing.html "../2d-physics-api/2d-physics-api-create-objects-landing.html")
* Destroy Physics Core 2D API objects and manage memory

Connect Physics Core 2D API objects with joints

Configuring Physics Core 2D API scenes

# Destroy Physics Core 2D API objects and manage memory

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

Destroy worlds, bodies, and shapes when you no longer need them. If you get physics objects in a `NativeArray` or `ReadOnlySpan`, you must also free up their memory to avoid memory leaks.

## Destroy physics objects

To destroy a world, body, or shape, call the `Destroy` method of the object. For example:

```
// Create a physics body
PhysicsBody myBody = world.CreateBody();

// Destroy the body when you no longer need it
myBody.Destroy();
```

To destroy objects quickly, use the following approaches:

* Destroy a physics body to automatically destroy all its shapes and chains, and any joints it’s connected to.
* Destroy a world to automatically destroy all its bodies and shapes.

Unity logs an error in the **Console** window if you try to destroy an object that no longer exists. To check if an object is already destroyed, get the `isValid` property of the object.

Unity might destroy your world automatically when you enter or exit Play mode.

## Destroy a batch of objects

To destroy a batch of objects, use the following methods instead:

* `DestroyBodyBatch` if you created the batch using `CreateBodyBatch`.
* `DestroyShapeBatch` if you created the batch using `CreateShapeBatch`.

### Protect objects from deletion

To protect an object from deletion, call the `SetOwner` method of the `PhysicsBody` object. `SetOwner` returns a unique key integer. If you try to destroy the body, you must pass in the key or the destruction fails. For more information, refer to [`PhysicsBody`](../../ScriptReference/Unity.U2D.Physics.PhysicsBody.html "../../ScriptReference/Unity.U2D.Physics.PhysicsBody.html").

**Warning**: The key is only a deterrent and doesn’t meet cryptographic standards.

## Avoid memory leaks

Most of the Physics Core 2D API avoids creating memory that needs disposing or garbage collection, and most methods return simple `struct` types.

However if you use an API that stores and returns physics objects or query results as a [`NativeArray`](../../ScriptReference/Unity.Collections.NativeArray_1.html "../../ScriptReference/Unity.Collections.NativeArray_1.html") or `ReadOnlySpan` type, the recommended best practice is to dispose of the native memory when you no longer need it. Disposing avoids memory leaks.

For example if you create an array of body definitions, use the `Dispose` method to free the memory when you no longer need it. For example:

```
void Start(){
    // Create a native array to hold body definitions
    // The allocator property determines the lifetime of the array
    NativeArray<PhysicsBodyDefinition> bodyDefinitions = new NativeArray<PhysicsBodyDefinition>(bodyCount, Allocator.Temp);
}

void OnDestroy()
{
    // Dispose of the native array to free up memory
    bodyDefinitions.Dispose();
}
```

You can also create native arrays with `using` statements to automatically dispose of them when they go out of scope. For example:

```
using NativeArray<PhysicsQuery.WorldCastResult> results = world.CastGeometry(objectGeometry, translation, filter, PhysicsQuery.WorldCastMode.Closest, Allocator.Temp);
```

To make `NativeArray` or `ReadOnlySpan` results persist beyond their scope, for example if you need data to persist for multiple frames, pass `Allocator.Persistent` into the method. This approach can decrease performance, and you must still dispose of the native array or read-only span when you no longer need it.

For more information about native memory and allocators, refer to [Native memory](../performance-native-memory.html "../performance-native-memory.html").

## Additional resources

* [Optimize the Physics Core 2D API with multithreading](2d-physics-api-multithreading.html "2d-physics-api-multithreading.html")
* [PhysicsCore2D repository](https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master "https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master") on GitHub

Connect Physics Core 2D API objects with joints

Configuring Physics Core 2D API scenes

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-add-sprite.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Creating a scene with the Physics Core 2D API](../2d-physics-api/2d-physics-api-create-objects-landing.html "../2d-physics-api/2d-physics-api-create-objects-landing.html")
* Add a sprite to a Physics Core 2D API object

Create an object with the Physics Core 2D API

Move a GameObject with the Physics Core 2D API

# Add a sprite to a Physics Core 2D API object

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

After you [create a physics object](2d-physics-api-physics-object.html "2d-physics-api-physics-object.html"), to add a [sprite](../sprite/sprite-landing.html "../sprite/sprite-landing.html")A 2D graphic objects. If you are used to working in 3D, Sprites are essentially just standard textures but there are special techniques for combining and managing sprite textures for efficiency and convenience during development. [More info](../sprite/sprite-landing.html "../sprite/sprite-landing.html")  
See in [Glossary](../Glossary.html#Sprite "../Glossary.html#Sprite"), add a Sprite Renderer component. Follow these steps:

1. In the **Hierarchy** window, select the GameObject with the `Unity.U2D.Physics` API script.
2. Select **Add Component**.
3. Select **Rendering** > **Sprite Renderer**.

You can also drag a sprite asset in the **Project** window to the GameObject in the **Hierarchy** window. This approach creates a new GameObject as a child of the physics body GameObject.

By default the sprite doesn’t move with the physics object. To make the sprite move, refer to [Move a GameObject with the physics API](2d-physics-api-move-gameobject.html "2d-physics-api-move-gameobject.html").

## Additional resources

* [Sprites](../sprite/sprite-landing.html "../sprite/sprite-landing.html")
* [Sprite Renderer](../sprite/renderer/sprite-renderer-reference.html "../sprite/renderer/sprite-renderer-reference.html")A component that lets you display images as Sprites for use in both 2D and 3D scenes. [More info](../sprite/renderer/sprite-renderer-reference.html "../sprite/renderer/sprite-renderer-reference.html")  
  See in [Glossary](../Glossary.html#SpriteRenderer "../Glossary.html#SpriteRenderer")

Create an object with the Physics Core 2D API

Move a GameObject with the Physics Core 2D API

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-reference-joint-hinge.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Reference for the Physics Core 2D API](../2d-physics-api/2d-physics-api-reference.html "../2d-physics-api/2d-physics-api-reference.html")
* Hinge joint definition reference for the Physics Core 2D API

Fixed joint definition reference for the Physics Core 2D API

Relative joint definition reference for the Physics Core 2D API

# Hinge joint definition reference for the Physics Core 2D API

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

Explore the properties you can use to configure a Physics Core 2D API hinge joint in the Unity Editor.

A hinge joint places two bodies at the same location, and allows the second body to rotate while connected to the first.

| **Property** | **Sub-property** | **Description** |
| --- | --- | --- |
| **Local Anchor A** | N/A | Sets where one end of the joint connects to the first body. |
| N/A | **Position** | Sets the position where the end of the joint connects, relative to the position of the first body. |
| N/A | **Rotation** | Sets the rotation of the anchor in degrees. |
| **Local Anchor B** | N/A | Sets where the other end of the joint connects to the second body. |
| N/A | **Position** | Sets the position where the end of the joint connects, relative to the position of the second body. |
| N/A | **Rotation** | Sets the rotation of the anchor in degrees. |
| **Enable Spring** | N/A | Enables **Spring Target Angle**, **Spring Frequency** and **Spring Damping**. The joint acts as a spring, so it stretches and compresses to try to make the angles of the two bodies the same. The strength of the pull is proportional to the current angle between the bodies. |
| **Spring Target Angle** | N/A | Sets the target angle in degrees. |
| **Spring Frequency** | N/A | Sets the stiffness of the spring in Hertz (cycles per second). A higher value makes the spring less stiff. The default is 0. |
| **Spring Damping** | N/A | Sets how quickly the spring stops pulling or pushing. A higher value makes the spring settle more quickly. The default is 0. |
| **Enable Motor** | N/A | Enables **Motor Speed** and **Max Motor Torque**, which make the joint act as a motor to rotate the second body. |
| **Motor Speed** | N/A | Sets the target rotation, in degrees per second. |
| **Max Motor Torque** | N/A | Sets the maximum force that the motor applies to reach the target rotation, in newtons. |
| **Enable Limit** | N/A | Enables **Lower Angle Limit** and **Upper Angle Limit**, which limit the angles of the two connected bodies. |
| **Lower Angle Limit** | N/A | Sets the minimum angle in degrees. The default is 0, which means no limit. |
| **Upper Angle Limit** | N/A | Sets the maximum angle in degrees. The default is 0, which means no limit. |
| **Force Threshold** | N/A | Sets the amount of linear force that creates an `OnJointThreshold2D` event. |
| **Torque Threshold** | N/A | Sets the amount of rotational force that creates an `OnJointThreshold2D` event. |
| **Tuning Frequency** | N/A | Sets the overall stiffness of the joint in Hertz (cycles per second). A higher value makes the joint less stiff. |
| **Tuning Damping** | N/A | Sets how quickly overall the joint stops pulling or pushing. A higher value makes the joint settle more quickly. |
| **Draw Scale** | N/A | Scales the joint Unity draws as a debug visualization. For more information, refer to [Draw a debug visualization of objects](2d-physics-api-debug-drawing.html "2d-physics-api-debug-drawing.html"). |
| **Collide Connected** | N/A | Enables the shapes creating collision or trigger events when they come into contact with each other. For more information, refer to [Collisions and interactions in the Physics Core 2D API](2d-physics-api-interactions-landing.html "2d-physics-api-interactions-landing.html"). |
| **World Drawing** | N/A | Draws the joint when Unity draws the debug visualization of the world. For more information, refer to [Draw a debug visualization of objects](2d-physics-api-debug-drawing.html "2d-physics-api-debug-drawing.html"). |

## Additional resources

* [`PhysicsHingeJointDefinition`](../../ScriptReference/Unity.U2D.Physics.PhysicsHingeJointDefinition.html "../../ScriptReference/Unity.U2D.Physics.PhysicsHingeJointDefinition.html")
* [Configure Physics Core 2D API scenes with definitions](2d-physics-api-definitions.html "2d-physics-api-definitions.html")
* [Configure global Physics Core 2D API settings](../class-PhysicsCoreSettings2D.html "../class-PhysicsCoreSettings2D.html")

Fixed joint definition reference for the Physics Core 2D API

Relative joint definition reference for the Physics Core 2D API

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-reference-chain.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Reference for the Physics Core 2D API](../2d-physics-api/2d-physics-api-reference.html "../2d-physics-api/2d-physics-api-reference.html")
* Chain definition reference for the Physics Core 2D API

Shape definition reference for the Physics Core 2D API

Distance joint definition reference for the Physics Core 2D API

# Chain definition reference for the Physics Core 2D API

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

Explore the properties you can use to configure a chain shape in the Unity Editor using the Physics Core 2D API.

## Surface Material

The properties in the **Surface Material** section determine how the shape interacts with other shapes.

| Property | Description |
| --- | --- |
| **Friction** | Sets the coefficient of friction for this collider. A value of 0 means no friction, like ice. A value of 1 means very high friction, like rubber. The default is 0.6. |
| **Bounciness** | Sets how bouncy the surface is, and how much other colliders bounce off it. A value of 0 means the surface is not at all bouncy, like soft clay. A value of 1 means the surface is very bouncy, like rubber. The default is 0. |
| **Friction Mixing** | Determines the method Unity uses to mix the friction of two objects when they make contact. The options are:  * **Average**: Uses the average of the two values. * **Mean**: Uses the geometric mean of the two values. The geometric mean multiplies the two values then returns the square root. * **Multiply**: Multiplies the two values together. * **Minimum**: Uses the smaller value. * **Maximum**: Uses the larger value. |
| **Bounciness Mixing** | Determines the method Unity uses to mix the bounciness of two objects when they make contact. The options are:  * **Average**: Uses the average of the two values. * **Mean**: Uses the geometric mean of the two values. The geometric mean multiplies the two values then returns the square root. * **Multiply**: Multiplies the two values together. * **Minimum**: Uses the smaller value. * **Maximum**: Uses the larger value. |
| **Friction Priority** | Determines which shape contributes its **Friction Mixing** mode when two shapes come into contact. Unity uses the **Friction Mixing** mode from the shape with the highest **Friction Priority** value. If the two shapes have the same **Friction Priority** value, Unity uses the highest `SurfaceMaterial.MixingMode` enumeration value from the two shapes. |
| **Bounciness Priority** | Determines which shape contributes its **Bounciness Mixing** mode when two shapes come into contact. Unity uses the **Bounciness Mixing** mode from the shape with the highest **Bounciness Priority** value. If the two shapes have the same **Bounciness Priority** value, Unity uses the highest `SurfaceMaterial.MixingMode` enumeration value from the two shapes. |
| **Rolling Resistance** | Sets how resistant the shape is to rolling. The range of values is 0 to 1, where 0 means no rolling resistance and 1 means full rolling resistance. |
| **Tangent Speed** | Sets the speed the surface moves other objects that come into contact with it, in meters per second. For example, if you set **Tangent Speed** to 5, the surface acts like a conveyor belt that moves objects along the surface at 5 meters per second. You can use a positive or negative value to set the direction of movement. |
| **Custom Color** | Sets the color Unity uses to draw the debug visualization of the shape. The alpha value is ignored. For more information, refer to [Draw a debug visualization of objects](2d-physics-api-debug-drawing.html "2d-physics-api-debug-drawing.html"). |

## Contact Filter

The properties in the **Contact Filter** section determine which other shapes the shape collides with. For more information, refer to [Configure collisions between objects](2d-physics-api-collisions-enable.html "2d-physics-api-collisions-enable.html").

| Property | Description |
| --- | --- |
| **Categories** | Sets the layers this shape belongs to. |
| **Contacts** | Sets the layers this shape collides with. |
| **Group Index** | Assigns the shape to a group, and overrides the **Categories** and **Contacts** properties. Use the following values:  * 0: Assigns no group. The shape uses the **Categories** and **Contacts** properties to determine collisions. * Positive value: The shape always collides with other shapes that have the same **Group Index**. * Negative value: The shape doesn’t collide with other shapes that have the same **Group Index**. |

## Other properties

| Property | Description |
| --- | --- |
| **Is Loop** | Connects the first and last vertices of the chain to form a loop. |
| **Trigger Events** | Produces a trigger event when the shape starts and ends overlapping another shape that has its **Is Trigger** property enabled. To fetch events, refer to [`PhysicsWorld.triggerBeginEvents`](../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.triggerBeginEvents.html "../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.triggerBeginEvents.html"). |
| **World Drawing** | Draws the chain when Unity draws the debug visualization of the world. For more information, refer to [Draw a debug visualization of objects](2d-physics-api-debug-drawing.html "2d-physics-api-debug-drawing.html"). |

## Additional resources

* [Create an object with the Physics Core 2D API](2d-physics-api-physics-object.html "2d-physics-api-physics-object.html")
* [Configure Physics Core 2D API scenes with definitions](2d-physics-api-definitions.html "2d-physics-api-definitions.html")
* [Configure global Physics Core 2D API settings](../class-PhysicsCoreSettings2D.html "../class-PhysicsCoreSettings2D.html")

Shape definition reference for the Physics Core 2D API

Distance joint definition reference for the Physics Core 2D API

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-workflow.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Get started with the Physics Core 2D API](../2d-physics-api/2d-physics-api-get-started-landing.html "../2d-physics-api/2d-physics-api-get-started-landing.html")
* Physics Core 2D API workflow

Introduction to the Physics Core 2D API

Creating a scene with the Physics Core 2D API

# Physics Core 2D API workflow

Create a 2D scene that simulates physics using the [`Unity.U2D.Physics` API](../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.html "../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.html").

Follow these steps:

1. [Include the Unity.U2D.Physics library](#script "#script") in a C# script.
2. [Create a 2D physics world](#world "#world").
3. [Create physics objects](#physics-objects "#physics-objects") and add them to the world.
4. [Configure objects with definitions](#configure-objects "#configure-objects").
5. [Attach the script to a GameObject](#attach-script "#attach-script"), then enter Play mode.

## Include the Unity.U2D.Physics library

In a [C# script](../scripting-get-started.html "../scripting-get-started.html"), add `using Unity.U2D.Physics;` at the top to include the `Unity.U2D.Physics` library.

You can use the `Unity.U2D.Physics` API in any C# script, not only [MonoBehaviour script files](../class-MonoBehaviour.html "../class-MonoBehaviour.html"). But if you use a MonoBehaviour script file, you can configure physics properties in the **Inspector** window of a GameObject, move GameObjects, and attach sprites.

## Create a 2D physics world

To add 2D physics objects, you first need to create a `PhysicsWorld` object to add them to. Do either of the following:

* Use the world Unity automatically creates.
* Create a new world.

For more information, refer to [Create a physics world](2d-physics-api-world.html "2d-physics-api-world.html").

## Create physics objects

To add physics objects to the world, do the following:

1. Create a `PhysicsBody` object, which defines the position, rotation, and velocity of an object. It doesn’t define an area.
2. Attach one or more `PhysicsShape` objects to the `PhysicsBody`, which define the area that interacts with other shapes. Unity also draws the shapes as a debug visualization.
3. Add the body to the world you created.

For more information, refer to [Create a physics object](2d-physics-api-physics-object.html "2d-physics-api-physics-object.html").

## Configure objects with definitions

To configure the properties of the world and its physics objects, create definition objects, for example `PhysicsBodyDefinition`. Definition objects contain properties like `position` and `gravity` that you can adjust in the Unity Editor, or pass into the object when you create it.

To configure the properties in the **Inspector** window, make the definition object a `public` field.

For more information, refer to [Configure objects using definitions](2d-physics-api-definitions.html "2d-physics-api-definitions.html").

## Attach the script to a GameObject

To start the simulation, you usually attach the script to a GameObject in your scene, then enter Play mode.

By default, physics objects don’t move a GameObject. To make a physics object update the Transform component of the GameObject, refer to [Move a GameObject with the Physics Core 2D API](2d-physics-api-move-gameobject.html "2d-physics-api-move-gameobject.html").

To add a sprite, refer to [Add a sprite to an object](2d-physics-api-add-sprite.html "2d-physics-api-add-sprite.html").

## Example

The following example creates a small circle that falls under gravity onto a large circle. Attach the script to a GameObject in your scene, then enter Play mode.

```
using UnityEngine;
using Unity.U2D.Physics;

public class Example2DPhysics : MonoBehaviour
{
    void Start()
    {
        // Create the world
        PhysicsWorld world = PhysicsWorld.defaultWorld;

        // Create a body in the world, with a definition object that sets the position and enables physics
        PhysicsBody object1 = world.CreateBody(new PhysicsBodyDefinition
        { 
            position = new Vector2(0.5f, 8f),
            type = PhysicsBody.BodyType.Dynamic
        });

        // Attach a circle shape to the first body 
        PhysicsShape object1shape = object1.CreateShape(new CircleGeometry());

        // Create a second body in the world, with a definition object that sets the position and disables physics
        PhysicsBody object2 = world.CreateBody(new PhysicsBodyDefinition
        { 
            position = new Vector2(0f, 0f),
            type = PhysicsBody.BodyType.Static
        });

        // Attach a circle shape to the second body 
        object2.CreateShape(new CircleGeometry { 
            radius = 3f,
        });
    }
}
```

## Additional resources

* [PhysicsCore2D repository](https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master "https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master") on GitHub

Introduction to the Physics Core 2D API

Creating a scene with the Physics Core 2D API

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-reference-joint-distance.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Reference for the Physics Core 2D API](../2d-physics-api/2d-physics-api-reference.html "../2d-physics-api/2d-physics-api-reference.html")
* Distance joint definition reference for the Physics Core 2D API

Chain definition reference for the Physics Core 2D API

Fixed joint definition reference for the Physics Core 2D API

# Distance joint definition reference for the Physics Core 2D API

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

Explore the properties you can use to configure a Physics Core 2D API distance joint in the Unity Editor.

A distance joint tries to keep the two connected bodies a certain distance apart.

| **Property** | **Sub-property** | **Description** |
| --- | --- | --- |
| **Local Anchor A** | N/A | Sets where one end of the joint connects to the first body. |
| N/A | **Position** | Sets the position where the end of the joint connects, relative to the position of the first body. |
| N/A | **Rotation** | Sets the rotation of the anchor in degrees. |
| **Local Anchor B** | N/A | Sets where the other end of the joint connects to the second body. |
| N/A | **Position** | Sets the position where the end of the joint connects, relative to the position of the second body. |
| N/A | **Rotation** | Sets the rotation of the anchor in degrees. |
| **Distance** | N/A | Sets the target distance between the two connected bodies. |
| **Enable Spring** | N/A | Enables **Spring Frequency**, **Spring Damping**, **Spring Lower Force**, and **Spring Upper Force**. The joint acts as a spring, so it stretches and compresses to try to reach the target distance. The strength of the pull is proportional to the current distance between the bodies. If you disable this property, the joint is rigid, and **Enable Motor** and **Enable Limit** have no effect. |
| **Spring Frequency** | N/A | Sets the stiffness of the spring in Hertz (cycles per second). A higher value makes the spring less stiff. The default is 0. |
| **Spring Damping** | N/A | Sets how quickly the spring stops pulling or pushing. A higher value makes the spring settle more quickly. The default is 0. |
| **Spring Lower Force** | N/A | Sets the maximum force that the spring applies when it’s stretched, in newtons. |
| **Spring Upper Force** | N/A | Sets the maximum force that the spring applies when it’s compressed, in newtons. |
| **Enable Motor** | N/A | Enables **Motor Speed** and **Max Motor Force**, which make the joint act as a motor to pull or push the two connected bodies. If you disable **Enable Spring**, this property has no effect.  **Note**: The motor can drive the bodies beyond the **Distance** value if it overpowers the spring. |
| **Motor Speed** | N/A | Sets the target motor speed, in meters per second. |
| **Max Motor Force** | N/A | Sets the maximum force that the motor applies to reach the target speed, in newtons. |
| **Enable Limit** | N/A | Enables **Min Distance Limit** and **Max Distance Limit**, which limit the distance between the two connected bodies. If you disable **Enable Spring**, this property has no effect. |
| **Min Distance Limit** | N/A | Sets the minimum distance between the bodies in meters. |
| **Max Distance Limit** | N/A | Sets the maximum distance between the bodies in meters. |
| **Force Threshold** | N/A | Sets the amount of linear force that creates an `OnJointThreshold2D` event. |
| **Torque Threshold** | N/A | Sets the amount of rotational force that creates an `OnJointThreshold2D` event. |
| **Tuning Frequency** | N/A | Sets the overall stiffness of the joint in Hertz (cycles per second). A higher value makes the joint less stiff. |
| **Tuning Damping** | N/A | Sets how quickly overall the joint stops pulling or pushing. A higher value makes the joint settle more quickly. |
| **Draw Scale** | N/A | Scales the joint Unity draws as a debug visualization. For more information, refer to [Draw a debug visualization of objects](2d-physics-api-debug-drawing.html "2d-physics-api-debug-drawing.html"). |
| **Collide Connected** | N/A | Enables the shapes creating collision or trigger events when they come into contact with each other. For more information, refer to [Collisions and interactions in the Physics Core 2D API](2d-physics-api-interactions-landing.html "2d-physics-api-interactions-landing.html"). |
| **World Drawing** | N/A | Draws the joint when Unity draws the debug visualization of the world. For more information, refer to [Draw a debug visualization of objects](2d-physics-api-debug-drawing.html "2d-physics-api-debug-drawing.html"). |

## Additional resources

* [`PhysicsDistanceJointDefinition`](../../ScriptReference/Unity.U2D.Physics.PhysicsDistanceJointDefinition.html "../../ScriptReference/Unity.U2D.Physics.PhysicsDistanceJointDefinition.html")
* [Configure Physics Core 2D API scenes with definitions](2d-physics-api-definitions.html "2d-physics-api-definitions.html")
* [Configure global Physics Core 2D API settings](../class-PhysicsCoreSettings2D.html "../class-PhysicsCoreSettings2D.html")

Chain definition reference for the Physics Core 2D API

Fixed joint definition reference for the Physics Core 2D API

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-reference-joint-wheel.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Reference for the Physics Core 2D API](../2d-physics-api/2d-physics-api-reference.html "../2d-physics-api/2d-physics-api-reference.html")
* Wheel joint definition reference for the Physics Core 2D API

Slider joint definition reference for the Physics Core 2D API

2D game development in URP

# Wheel joint definition reference for the Physics Core 2D API

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

Explore the properties you can use to configure a Physics Core 2D API wheel joint in the Unity Editor.

A wheel joint pins two bodies together, for example a suspension object and a wheel. You can then rotate the second object with a motor so it moves along ground.

| **Property** | **Sub-property** | **Description** |
| --- | --- | --- |
| **Local Anchor A** | N/A | Sets where one end of the joint connects to the first body. |
| N/A | **Position** | Sets the position where the end of the joint connects, relative to the position of the first body. |
| N/A | **Rotation** | Sets the rotation of the anchor in degrees. |
| **Local Anchor B** | N/A | Sets where the other end of the joint connects to the second body. |
| N/A | **Position** | Sets the position where the end of the joint connects, relative to the position of the second body. |
| N/A | **Rotation** | Sets the rotation of the anchor in degrees. |
| **Enable Spring** | N/A | Enables **Spring Frequency**, **Spring Damping**, **Spring Lower Force**, and **Spring Upper Force**. The spring connects the two bodies, and stretches and compresses to try to bring the bodies together. The strength of the pull is proportional to the current distance between the bodies. |
| **Spring Frequency** | N/A | Sets the stiffness of the spring. A higher value makes the spring less stiff. The default is 0. |
| **Spring Damping** | N/A | Sets how quickly the spring stops pulling or pushing. A higher value makes the spring settle more quickly. The default is 0. |
| **Enable Motor** | N/A | Enables **Motor Speed** and **Max Motor Torque**, which make the joint act as a motor to rotate the second body. |
| **Motor Speed** | N/A | Sets the target rotation speed of the second body, in degrees per second. |
| **Max Motor Torque** | N/A | Sets the maximum force that the motor applies to reach the target rotation speed, in newtons. |
| **Enable Limit** | N/A | Enables **Upper Translation Limit** and **Lower Translation Limit**, which restrict the position of the bodies. |
| **Lower Translation Limit** | N/A | Sets the minimum position in meters. |
| **Upper Translation Limit** | N/A | Sets the maximum position in meters. |
| **Force Threshold** | N/A | Sets the amount of linear force that creates an `OnJointThreshold2D` event. |
| **Torque Threshold** | N/A | Sets the amount of rotational force that creates an `OnJointThreshold2D` event. |
| **Tuning Frequency** | N/A | Sets the overall stiffness of the joint in Hertz (cycles per second). A higher value makes the joint less stiff. |
| **Tuning Damping** | N/A | Sets how quickly overall the joint stops pulling or pushing. A higher value makes the joint settle more quickly. |
| **Draw Scale** | N/A | Scales the joint Unity draws as a debug visualization. For more information, refer to [Draw a debug visualization of objects](2d-physics-api-debug-drawing.html "2d-physics-api-debug-drawing.html"). |
| **Collide Connected** | N/A | Enables the shapes creating collision or trigger events when they come into contact with each other. For more information, refer to [Collisions and interactions in the Physics Core 2D API](2d-physics-api-interactions-landing.html "2d-physics-api-interactions-landing.html"). |
| **World Drawing** | N/A | Draws the joint when Unity draws the debug visualization of the world. For more information, refer to [Draw a debug visualization of objects](2d-physics-api-debug-drawing.html "2d-physics-api-debug-drawing.html"). |

## Additional resources

* [`PhysicsWheelJointDefinition`](../../ScriptReference/Unity.U2D.Physics.PhysicsWheelJointDefinition.html "../../ScriptReference/Unity.U2D.Physics.PhysicsWheelJointDefinition.html")
* [Configure Physics Core 2D API scenes with definitions](2d-physics-api-definitions.html "2d-physics-api-definitions.html")
* [Configure global Physics Core 2D API settings](../class-PhysicsCoreSettings2D.html "../class-PhysicsCoreSettings2D.html")

Slider joint definition reference for the Physics Core 2D API

2D game development in URP

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-landing.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* 2D physics with the Physics Core 2D API

Physics Material 2D reference

Get started with the Physics Core 2D API

# 2D physics with the Physics Core 2D API

Create and control a 2D physics scene in a C# script using the [`Unity.U2D.Physics`](../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.html "../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.html") API.

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

| **Topic** | **Description** |
| --- | --- |
| [Get started with the Physics Core 2D API](2d-physics-api-get-started-landing.html "2d-physics-api-get-started-landing.html") | Learn about the `Unity.U2D.Physics` API and how to create a 2D physics scene. |
| [Creating a scene with the Physics Core 2D API](2d-physics-api-create-objects-landing.html "2d-physics-api-create-objects-landing.html") | Create and debug a scene that uses 2D physics. |
| [Configuring Physics Core 2D API scenes](2d-physics-api-properties-landing.html "2d-physics-api-properties-landing.html") | Configure 2D physics objects and global settings, and attach custom data to physics objects. |
| [Collisions and interactions in the Physics Core 2D API](2d-physics-api-interactions-landing.html "2d-physics-api-interactions-landing.html") | Enable and detect collisions between 2D physics objects, and cast rays to check for intersections. |
| [Run 2D physics in 3D space using the Physics Core 2D API](2d-physics-api-3d-planes.html "2d-physics-api-3d-planes.html") | Create a 2D physics world at any angle in 3D space, instead of the traditional x, y plane that faces the camera. |
| [Optimize the Physics Core 2D API](2d-physics-api-multithreading.html "2d-physics-api-multithreading.html") | To improve the performance of 2D physics, run the simulation and your own code on multiple threads. |
| [Reference for the Physics Core 2D API](2d-physics-api-reference.html "2d-physics-api-reference.html") | Explore the properties and settings you can use to configure the global settings of the Physics Core 2D API, and set the default values for objects like worlds, bodies, and shapes. |

## Additional resources

* [PhysicsCore2D repository](https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master "https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master") on GitHub

Physics Material 2D reference

Get started with the Physics Core 2D API

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-3d-planes.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* Use 2D physics in 3D space using the Physics Core 2D API

Check Physics Core 2D API intersections

Optimize the Physics Core 2D API with multithreading

# Use 2D physics in 3D space using the Physics Core 2D API

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

Create a 2D physics world at any angle in 3D space, instead of the traditional x, y plane that faces the camera. This allows you to use 2D physics in a 3D game.

Follow these steps:

1. [Create a physics world](2d-physics-api-world.html "2d-physics-api-world.html").
2. Set the `transformPlane` property of the world to `XZ`, `ZY`, or `Custom`.

The physics system continues to use 2D `Vector2` coordinates and vectors, but Unity converts the final positions to 3D space according to the `transformPlane`:

* `XY` means the x-axis remains horizontal and the y-axis remains vertical, so that the world faces the camera in 3D space. This is the default.
* `XZ` means the x-axis remains horizontal but the y-axis becomes depth, so that the world lies flat in 3D space.
* `ZY` means the x-axis becomes depth but the y-axis remains vertical, so that the world stands upright in 3D space.
* `Custom` means Unity uses a plane you define.

To convert coordinates manually between 2D `Vector2` and 3D `Vector3` types, use the helper methods in the [`PhysicsMath`](../../ScriptReference/Unity.U2D.Physics.PhysicsMath.html "../../ScriptReference/Unity.U2D.Physics.PhysicsMath.html") API.

The following example uses the `XZ` plane, which creates a 2D physics world that lies flat on the ground in 3D space.

To check the effect, you might need to set the Scene view to **3D** mode. For more information, refer to [Gizmos menu](../GizmosMenu.html "../GizmosMenu.html").

```
using Unity.Collections;
using UnityEngine;
using Unity.U2D.Physics;

public class CreateXZPlane : MonoBehaviour
{
    public PhysicsWorld world;

    private void Start()
    {
        // Create a world with a transform plane of XZ, which is the floor in 3D space.
        PhysicsWorldDefinition worldProperties = new PhysicsWorldDefinition
        {
            transformPlane = PhysicsWorld.TransformPlane.XZ,
            gravity = Vector2.zero
        };
        world = PhysicsWorld.Create(worldProperties);

        // Create a square boundary
        PhysicsBody boundary = world.CreateBody();
        using NativeList<Vector2> extentPoints = new NativeList<Vector2>(Allocator.Temp)
        {
            new(-4f, 4f),
            new(4f, 4f),
            new(4f, -4f),
            new(-4f, -4f)
        };
        ChainGeometry boundaryWalls = new ChainGeometry(extentPoints.AsArray());
        boundary.CreateChain(boundaryWalls, PhysicsChainDefinition.defaultDefinition);

        // Create a body and set it moving
        PhysicsBodyDefinition bodyDefinition = new PhysicsBodyDefinition();
        bodyDefinition.type = PhysicsBody.BodyType.Dynamic;
        bodyDefinition.linearVelocity = new Vector2(7.3f, 5.7f);
        bodyDefinition.angularVelocity = 0f;
        PhysicsBody body = world.CreateBody(bodyDefinition);

        // Add a shape with a bouncy material
        body.transformObject = transform;
        PhysicsShapeDefinition shapeDefinition = new PhysicsShapeDefinition();
        shapeDefinition.surfaceMaterial = new PhysicsShape.SurfaceMaterial{bounciness = 1f, friction = 0f};
        body.CreateShape(new CircleGeometry { radius = 1f }, shapeDefinition);
    }

    private void OnDisable()
    {
        world.Destroy();
    }
}
```

## Additional resources

* [3D GameObjects in 2D URP scenes](../urp/2d-renderer-urp-features-landing.html "../urp/2d-renderer-urp-features-landing.html")
* [PhysicsCore2D repository](https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master "https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master") on GitHub.
* [World definition reference for the Physics Core 2D API](2d-physics-api-reference-world.html "2d-physics-api-reference-world.html")

Check Physics Core 2D API intersections

Optimize the Physics Core 2D API with multithreading

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-create-objects-landing.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* Creating a scene with the Physics Core 2D API

Physics Core 2D API workflow

Create a world with the Physics Core 2D API

# Creating a scene with the Physics Core 2D API

Create and debug a scene that uses 2D physics with the Physics Core 2D API.

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

| **Topic** | **Description** |
| --- | --- |
| [Create a physics world](2d-physics-api-world.html "2d-physics-api-world.html") | Create a new world to add 2D physics objects to, or fetch the default world Unity automatically creates. |
| [Create a physics object](2d-physics-api-physics-object.html "2d-physics-api-physics-object.html") | Create a 2D physics body, then attach shapes to the body. |
| [Add a sprite](2d-physics-api-add-sprite.html "2d-physics-api-add-sprite.html") | Add a SpriteRenderer component to a GameObject that has a physics script attached. |
| [Move a GameObject](2d-physics-api-move-gameobject.html "2d-physics-api-move-gameobject.html") | Configure a 2D physics script to update the Transform component of a GameObject. |
| [Draw a debug visualization of objects](2d-physics-api-debug-drawing.html "2d-physics-api-debug-drawing.html") | Configure how Unity draws 2D physics objects in the Unity Editor or at runtime, and draw your own shapes. |
| [Combine shapes](2d-physics-api-connect-combine-shapes.html "2d-physics-api-connect-combine-shapes.html") | To combine physics shapes into a compound shape, create a composer using a `PhysicsComposer` object. |
| [Connect objects with joints](2d-physics-api-joints.html "2d-physics-api-joints.html") | Create a connection or constraint between two physics objects. |
| [Destroy objects and manage memory](2d-physics-api-destroy.html "2d-physics-api-destroy.html") | Destroy a world, body, and shape when you no longer need them, and free up memory when necessary. |

## Additional resources

* [Configure Physics Core 2D API scenes](2d-physics-api-properties-landing.html "2d-physics-api-properties-landing.html")
* [PhysicsCore2D repository](https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master "https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master") on GitHub

Physics Core 2D API workflow

Create a world with the Physics Core 2D API

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-properties-landing.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* Configuring Physics Core 2D API scenes

Destroy Physics Core 2D API objects and manage memory

Configure Physics Core 2D API objects with definitions

# Configuring Physics Core 2D API scenes

Configure properties such as gravity, friction, position, and shape on a world, body, or shape using the Physics Core 2D API.

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

| **Topic** | **Description** |
| --- | --- |
| [Configure objects with definitions](2d-physics-api-definitions.html "2d-physics-api-definitions.html") | Create a definition object to configure properties such as gravity, friction, position, and shape. |
| [Configure global Physics Core 2D API settings](../class-PhysicsCoreSettings2D.html "../class-PhysicsCoreSettings2D.html") | To configure layers, default definition values, and global settings, create and assign a Physics Core Settings 2D asset. |
| [Attach custom data to objects](2d-physics-api-custom-data.html "2d-physics-api-custom-data.html") | Attach values and physics masks to physics objects so you can fetch them later. |

## Additional resources

* [Configure global Physics Core 2D API settings](../class-PhysicsCoreSettings2D.html "../class-PhysicsCoreSettings2D.html")
* [Attach custom data to Physics Core 2D API objects](2d-physics-api-custom-data.html "2d-physics-api-custom-data.html")

Destroy Physics Core 2D API objects and manage memory

Configure Physics Core 2D API objects with definitions

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-reference-world.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Reference for the Physics Core 2D API](../2d-physics-api/2d-physics-api-reference.html "../2d-physics-api/2d-physics-api-reference.html")
* World definition reference for the Physics Core 2D API

Reference for the Physics Core 2D API

Body definition reference for the Physics Core 2D API

# World definition reference for the Physics Core 2D API

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

Explore the properties you can use to configure a physics world in the Unity Editor, if you create a public `PhysicsWorldDefinition` object. For more information, refer to [Create a world with the Physics Core 2D API](2d-physics-api-world.html "2d-physics-api-world.html").

| **Property** | **Description** |
| --- | --- |
| **Gravity** | Sets the gravity Unity applies to all the bodies in the world. The default is –9.81 on the y-axis, which simulates Earth’s gravity. |
| **Simulation Type** | Sets when the physics simulation runs. The options are:  * **Fixed Update**: Runs the simulation automatically during the `FixedUpdate` event stage. * **Update**: Runs the simulation automatically during the `Update` event stage. * **Script**: The simulation runs only when you call [`PhysicsWorld.Simulate`](../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.Simulate.html "../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.Simulate.html").  For more information, refer to [Event functions](../event-functions.html "../event-functions.html"). |
| **Simulation Sub Steps** | Sets the number of times the physics simulation runs per step to calculate stable values. If your world includes a complex set of joints, increasing this value can improve performance. The default is 4. |
| **Simulation Workers** | Sets the number of threads the simulation uses. The default is 64. The number of threads might be limited by the number of available CPU cores on the device. |
| **Transform Write Mode** | Sets the method Unity uses to copy the position of the physics body to the Transform component on the GameObject. The options are:  * **Off**: Doesn’t copy the position or rotation. * **Fast 2D**: Copies the position and one rotational axis, so any 3D rotations are ignored. This is the default. * **Slow 3D**: Copies the position and the full 3D rotation. * **Custom**: Calls the callback you set using `PhysicsWorld.transformWriteCallbackTarget`, so you can write custom code.  For more information, refer to [Move a GameObject](2d-physics-api-move-gameobject.html "2d-physics-api-move-gameobject.html"). |
| **Transform Tween Mode** | Interpolates or extrapolates the positions of physics bodies between simulation updates, and writes their positions to Transform components. The options are:  * **Off**: Doesn’t interpolate or extrapolate positions. * **Parallel**: Interpolates or extrapolates positions on parallel threads using the [job system](../job-system.html "../job-system.html"). * **Sequential**: Interpolates or extrapolates positions on a single thread. This option might be faster than **Parallel** if you have a small number of Transform components in a simple hierarchy. * **Custom**: Calls the callback you set using `PhysicsWorld.transformWriteCallbackTarget`, so you can write custom tweening code.  This property has no effect if you disable **Transform Write Mode**. For more information, refer to [Move a GameObject](2d-physics-api-move-gameobject.html "2d-physics-api-move-gameobject.html"). |
| **Transform Plane** | Determines which 3D space to convert the final 2D positions to. The options are:  * **XY**: The x-axis remains horizontal and the y-axis remains vertical, so that the world faces the camera in 3D space. This is the default. * **XZ**: The x-axis remains horizontal but the y-axis becomes depth, so that the world lies flat in 3D space. * **ZY**: The x-axis becomes depth but the y-axis remains vertical, so that the world stands upright in 3D space. * **Custom**: Uses the custom plane you set in the **Transform Plane Custom** parameter. For more information, refer to the [Transform Plane Custom](#transform-plane-custom "#transform-plane-custom") section.  For more information, refer to [Use 2D physics in 3D space using the Physics Core 2D API](2d-physics-api-3d-planes.html "2d-physics-api-3d-planes.html"). |
| **Sync Interpolation** | Avoids interpolated positions becoming out of sync between the physics body and the Transform component. Enabling this property adds an extra pass to write the interpolated position, which can reduce performance. This property only affects bodies that have **Transform Write Mode** set to **Interpolate**. |
| **Sleeping Allowed** | Removes bodies from physics calculations when they move at a slower speed than their **Sleep Threshold** value, to save processor time. When a sleeping body receives a collision or force, Unity wakes up the body and continues to include it in physics calculations. The recommended best practice is to leave this property enabled. |
| **Continuous Allowed** | Enables continuous collision detection to prevent moving bodies tunnelling through static bodies. For more information, refer to [Configure collisions between Physics Core 2D API objects](2d-physics-api-collisions-enable.html "2d-physics-api-collisions-enable.html"). |
| **Contact Filter Callbacks** | Enables physics objects optionally calling the `IContactFilterCallback` method of a shape if it makes contact with another shape, so you can run your own code that determines whether the shapes should collide. |
| **Pre Solve Callbacks** | Enables physics objects optionally calling the `OnPreSolve2D` method of a dynamic body before Unity calculates the collision response, so you can run your own code. |
| **Auto Body Update Callbacks** | Enables physics objects optionally calling the `IBodyUpdateCallback` method of a body if it’s updated, so you can run your own code. |
| **Auto Contact Callbacks** | Enables physics objects optionally calling the `OnContactBegin2D` and `OnContactEnd2D` methods of a shape if it makes contact with another shape, so you can run your own code. For more information, refer to [Detect collisions between Physics Core 2D API objects](2d-physics-api-collision-handle.html "2d-physics-api-collision-handle.html") |
| **Auto Trigger Callbacks** | Enables physics objects optionally calling the `OnTriggerBegin2D` and `OnTriggerEnd2D` methods of a shape if it makes contact with another shape, so you can run your own code. For more information, refer to [Detect collisions between Physics Core 2D API objects](2d-physics-api-collision-handle.html "2d-physics-api-collision-handle.html"). |
| **Auto Joint Threshold Callbacks** | Enables physics objects optionally calling the `OnJointThreshold2D` method of a joint if it exceeds its **Force Threshold** or **Torque Threshold** value. |
| **Bounce Threshold** | Sets the collision velocity in meters per second that causes objects to bounce. Avoid very small values, otherwise Unity can’t put bodies to sleep to reduce CPU time. |
| **Contact Hit Event Threshold** | Sets the relative speed in meters per second that two shapes must reach to generate a contact hit event. |
| **Contact Frequency** | Sets the stiffness of how objects respond to contact in Hertz (cycles per second). A lower value makes contact softer and spongier. A higher value makes contact harder and more rigid. |
| **Contact Damping** | Sets how quickly objects absorb the shock of a collision. A lower value makes objects less likely to settle after a collision. A higher value makes objects settle more quickly. The default value is 10. |
| **Contact Speed** | Sets the speed Unity can push overlapping objects apart to separate them, in meters per second. The default value is 3. |
| **Maximum Linear Speed** | Sets the maximum speed of objects in the world, in meters per second. |
| **Draw Options** | Determines which bodies, shapes, joints, and collisions Unity draws. The options are:  * **Off** * **Selected Bodies**: Draws the bodies attached to GameObjects you select in the **Hierarchy** window. * **Selected Shapes**: Draws the shapes attached to GameObjects you select in the **Hierarchy** window. * **Selected Shape Bounds**: Draws the bounds of shapes attached to GameObjects you select in the **Hierarchy** window. * **Selected Joints**: Draws the joints attached to GameObjects you select in the **Hierarchy** window. * **All Bodies**: Draws all bodies. * **All Shapes**: Draws all shapes. * **All Shape Bounds**: Draws the bounds of all shapes. * **All Joints**: Draws all joints. * **All Contact Points**: Draws the points where shapes touch. * **All Contact Normal**: Draws the direction that force is applied at contact points. * **All Contact Impulse**: Draws the amount of force applied at contact points. * **All Contact Friction**: Draws the friction forces at contact points. * **All Solver Islands**: Draws groups of connected bodies and joints. * **Default Selected**: Draws the physics objects attached to GameObjects you select in the **Hierarchy** window. * **Default All**: Draws everything.  For more information, refer to [Draw a debug visualization of objects](2d-physics-api-debug-drawing.html "2d-physics-api-debug-drawing.html"). |
| **Draw Fill Options** | Defines which parts of shapes Unity draws. The options are:  * **Interior**: Draws the interior of the shape. * **Outline**: Draws the outline of the shape. * **Orientation**: Draws a line that represents the orientation of the shape. |
| **Draw Filter** | Disables Unity drawing specific types of bodies and shapes. |
| **Draw Thickness** | Sets the thickness of the lines Unity draws in pixels. |
| **Draw Fill Alpha** | Sets the transparency of the color Unity uses to fill shapes. Accepted values range from 0 to 1. This property has no effect if you disable **Outline** in **Draw Fill Options**. |
| **Draw Point Scale** | Sets the size of the points that Unity draws. |
| **Draw Normal Scale** | Sets the size of the contact normals for joints that Unity draws. |
| **Draw Force Scale** | Sets the size of the contact forces for joints that Unity draws. |
| **Draw Colors** | Sets the different colors Unity uses to draw each element. |

## Transform Plane Custom

These properties only have an effect if you set **Transform Plane** to **Custom**.

| **Property** | **Description** |
| --- | --- |
| **Translate** | Sets the position of the plane in 3D space. |
| **Rotate** | Sets the rotation of the plane in 3D space. |
| **Scale** | Scales the plane. |

## Additional resources

* [Create a world with the Physics Core 2D API](2d-physics-api-world.html "2d-physics-api-world.html")
* [Configure Physics Core 2D API scenes with definitions](2d-physics-api-definitions.html "2d-physics-api-definitions.html")
* [Configure global Physics Core 2D API settings](../class-PhysicsCoreSettings2D.html "../class-PhysicsCoreSettings2D.html")

Reference for the Physics Core 2D API

Body definition reference for the Physics Core 2D API

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-multithreading.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* Optimize the Physics Core 2D API with multithreading

Use 2D physics in 3D space using the Physics Core 2D API

Reference for the Physics Core 2D API

# Optimize the Physics Core 2D API with multithreading

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

To improve the performance of the Physics Core 2D API, use your available CPU cores to run the physics simulation and your own 2D physics code on multiple threads.

## Run the simulation on multiple threads

To increase the number of worker threads the 2D physics system uses to calculate the simulation, set the **Simulation Workers** property after you [create a world](2d-physics-api-world.html "2d-physics-api-world.html"). The number of CPU cores on your device might mean the system uses fewer threads than you request.

To avoid performance issues, avoid changing the number of simulation workers at runtime.

## Run your own code on multiple threads

To run Physics Core 2D API methods on all available CPU cores, use the [job system](../job-system.html "../job-system.html") to split the calculations across worker threads. For example, use multiple threads to check for overlaps between a very large number of physics objects.

Most of the API is thread-safe, which means multiple worker threads can read and write the same physics data without interfering with each other. Inside a physics world, any number of threads can read data simultaneously, but only one thread can write data at a time. This is called a Write Once, Read Many (WORM) locking mechanism.

Each physics world is isolated from the others, so you can write data to different physics worlds on separate threads simultaneously.

The following methods aren’t guaranteed to be thread-safe, so you can’t use them in the job system:

* `Create`, for example `PhysicsBody.Create`
* `CreateBatch`, for example `PhysicsBody.CreateBatch`
* `Destroy`, for example `PhysicsBody.Destroy`
* `DestroyBatch`, for example `PhysicsBody.DestroyBatch`

For more information about creating a multithreaded job, refer to [Create and run a job](../job-system-creating-jobs.html "../job-system-creating-jobs.html").

## Additional resources

* [Write multithreaded code with the job system](../job-system.html "../job-system.html")
* [`PhysicsWorld.concurrentSimulations`](../../ScriptReference/Unity.U2D.Physics.PhysicsWorld-concurrentSimulations.html "../../ScriptReference/Unity.U2D.Physics.PhysicsWorld-concurrentSimulations.html")
* [Physics Core Settings 2D asset Inspector window reference](../class-PhysicsCoreSettings2D.html "../class-PhysicsCoreSettings2D.html")

Use 2D physics in 3D space using the Physics Core 2D API

Reference for the Physics Core 2D API

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-definitions.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Configuring Physics Core 2D API scenes](../2d-physics-api/2d-physics-api-properties-landing.html "../2d-physics-api/2d-physics-api-properties-landing.html")
* Configure Physics Core 2D API objects with definitions

Configuring Physics Core 2D API scenes

Configure global Physics Core 2D API settings

# Configure Physics Core 2D API objects with definitions

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

To configure the properties of a physics world and its objects, such as gravity, friction, position, and shape, use definitions. Definitions are objects that store physics properties and values. You create a definition, then pass it into the world, body, or shape you create.

Definitions optimize physics performance by avoiding you setting properties after you create a world, body, or shape, which can make the CPU do extra work. Definitions also allow you to pass around and reuse sets of values.

For the full list of definition objects, refer to the [`Unity.U2D.Physics` API](../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.html "../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.html") documentation.

## Create and use a definition

Follow these steps:

1. Create a public definition object in your script, for example a `PhysicsBodyDefinition` object to configure a `PhysicsBody`.

   ```
   // Create a new body definition with default properties and values
   public PhysicsBodyDefinition bodyDefinition = new PhysicsBodyDefinition();
   ```

   A new definition has a set of default values. To change the default values you receive, refer to the [Change the default definition values](#change-default-definitions "#change-default-definitions") section.
2. Pass in the definition when you create the physics object. For example:

   ```
   PhysicsBody myObject = world.CreateBody(bodyDefinition);
   ```

If your script is in a `MonoBehaviour` class attached to a GameObject, Unity displays the properties of the definition in the **Inspector** window so you can configure them. For the full list of default properties, refer to [Definitions reference for the Physics Core 2D API](2d-physics-api-reference.html "2d-physics-api-reference.html").

If you change the definition after you create an object with it, the changes don’t affect the existing object.

**Note:** Definitions are large `struct` objects. To pass definitions into other methods, the recommended best practice is to use the `ref` or `in` keyword to pass them by reference. Passing by reference avoids using extra memory to copy the structure.

## Set a definition property in a script

To configure the definition in your script, set the properties of the definition before you create the object with it.

For the full list of properties, refer to the [`Unity.U2D.Physics` API](../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.html "../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.html") documentation.

For example:

```
public PhysicsBodyDefinition bodyDefinition = new PhysicsBodyDefinition
{
    // Set the linear velocity
    linearVelocity = Vector2.right * 4f,

    // Set the gravity scale
    gravityScale = 0f
};

// Create the body
PhysicsBody myObject = world.CreateBody(bodyDefinition);
```

**Note**: Changing the `position` of a physics body doesn’t change its center of mass. Unity calculates the center of mass based on the mass of the shapes attached to the body.

## Create multiple objects with the same definition

To create multiple physics bodies or physics shapes with the same configuration, call the `CreateBodyBatch` method of your world object. Pass in the definition and the number of objects you want to create. For example:

```
// Create 500 bodies using the single definition
NativeArray<PhysicsBody> fiveHundredBodies = world.CreateBodyBatch(bodyDefinition, 500);
```

**Important**: `CreateBodyBatch` returns a `NativeArray` type that points to native memory, so you must dispose the memory when you finish using it. For more information, refer to [Destroy Physics Core 2D API objects and manage memory](2d-physics-api-destroy.html "2d-physics-api-destroy.html").

## Change the default definitions

To change the default values you receive when you use `new` or `.defaultDefinition` to create a definition object, follow these steps:

1. Create and assign a Physics Core Settings 2D asset. For more information, refer to [Configure global 2D physics settings](../class-PhysicsCoreSettings2D.html "../class-PhysicsCoreSettings2D.html").
2. In the **Project Settings** window, select **PhysicsCore 2D** > **Settings**.
3. Configure the properties in the **Default Definitions** tab.

For a full list of properties, refer to [PhysicsCore 2D reference](../class-PhysicsCore2DProjectSettings.html "../class-PhysicsCore2DProjectSettings.html")

### Example

The following example uses a body definition to set the position of a physics body, then a shape definition to set the density of a shape.

```
using UnityEngine;
using Unity.U2D.Physics;

public class CreateObjectsWithDefinitions : MonoBehaviour
{
    
    PhysicsWorld world;
    
    // Declare definitions with default properties for the body and shape
    public PhysicsBodyDefinition bodyDefinition = new PhysicsBodyDefinition();
    public PhysicsShapeDefinition  shapeDefinition = new PhysicsShapeDefinition();
 
    void Start()
    {
        // Get the default world
        world = PhysicsWorld.defaultWorld;

        // Set the position of the body using the body definition
        bodyDefinition.position = new Vector2(0f, 5f);

        // Create the physics body with the body definition
        PhysicsBody myObject = world.CreateBody(bodyDefinition);

        // Set the density of the shape to 5 kg/m²
        shapeDefinition.density = 5f;

        // Create the circle geometry
        CircleGeometry circleGeometry = new CircleGeometry { radius = 1.5f };

        // Create the shape with both the geometry and the shape definition
        myObject.CreateShape(circleGeometry, shapeDefinition);
    }
}
```

## Additional resources

* [Create a world with the Physics Core 2D API](2d-physics-api-world.html "2d-physics-api-world.html")
* [Create an object with the Physics Core 2D API](2d-physics-api-physics-object.html "2d-physics-api-physics-object.html")
* [Configure global Physics Core 2D API settings](../class-PhysicsCoreSettings2D.html "../class-PhysicsCoreSettings2D.html")
* [PhysicsCore 2D reference](../class-PhysicsCore2DProjectSettings.html "../class-PhysicsCore2DProjectSettings.html")

Configuring Physics Core 2D API scenes

Configure global Physics Core 2D API settings

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-collision-handle.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Collisions and interactions in the Physics Core 2D API](../2d-physics-api/2d-physics-api-interactions-landing.html "../2d-physics-api/2d-physics-api-interactions-landing.html")
* Detect collisions between Physics Core 2D API objects

Configure collisions between Physics Core 2D API objects

Check Physics Core 2D API intersections

# Detect collisions between Physics Core 2D API objects

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

After you [configure collisions](2d-physics-api-collisions-enable.html "2d-physics-api-collisions-enable.html"), to detect when collisions occur and respond to them, use collision callback methods.

Follow these steps:

1. To enable collision callback methods, set the `autoContactCallbacks` property of the [physics world](2d-physics-api-world.html "2d-physics-api-world.html") to `true`.
2. Add `PhysicsCallbacks.IContactCallback` to the list of implemented interfaces in your script. For example:

   ```
   public class DetectCollisions : MonoBehaviour, PhysicsCallbacks.IContactCallback
   {
       ...
   }
   ```
3. Implement the `OnContactBegin2D` and `OnContactEnd2D` methods of the interface, and include the code you want to run when a collision starts and ends.
4. To activate the callback methods when a collision occurs, set the `contactEvents` property of the shape to `true` and the `callbackTarget` property to `this`.

For example, the following code creates a circle that logs when it collides with a larger circle:

```
using UnityEngine;
using Unity.U2D.Physics;

// Add the PhysicsCallbacks.IContactCallback interface
public class DetectCollisions : MonoBehaviour, PhysicsCallbacks.IContactCallback
{
    void Start()
    {
        PhysicsWorld world = PhysicsWorld.defaultWorld;
        
        // Set the world to use automatic contact callbacks
        // Don't do this in production code. Configure the setting using a Physics Core Settings 2D asset instead.
        world.autoContactCallbacks = true;

        // Create a small falling circle
        PhysicsBody object1 = world.CreateBody(new PhysicsBodyDefinition
        { 
            position = new Vector2(0.5f, 8f),
            type = PhysicsBody.BodyType.Dynamic
        });
        PhysicsShape object1shape = object1.CreateShape(CircleGeometry.defaultGeometry);

        // Create a larger static circle below
        PhysicsBody object2 = world.CreateBody(new PhysicsBodyDefinition
        { 
            position = new Vector2(0f, 0f),
            type = PhysicsBody.BodyType.Static
        });
        object2.CreateShape(new CircleGeometry { 
            radius = 3f,
        });

        // Set object 1 to activate collisions
        object1shape.contactEvents = true;  
        object1shape.callbackTarget = this;
    }

    // Log when the small circle collides
    public void OnContactBegin2D(PhysicsEvents.ContactBeginEvent eventData)
    {
        var contact = eventData.contactId.contact;
        Debug.Log("Collision started between shapes: " + contact.shapeA + " and " + contact.shapeB);
    }

    // Log when the small circle stops colliding
    public void OnContactEnd2D(PhysicsEvents.ContactEndEvent eventData)
    {
        var contact = eventData.contactId.contact;
        Debug.Log("Collision ended between shapes: " + contact.shapeA + " and " + contact.shapeB);
    }
}
```

## Detect a trigger overlap

A trigger shape doesn’t collide with other colliders. Instead, other colliders pass through it. For more information, refer to [Introduction to collision in the Physics Core 2D API](2d-physics-api-interactions-introduction.html "2d-physics-api-interactions-introduction.html").

To detect when a trigger reports an overlap with another shape, follow these steps instead:

1. To enable trigger callback methods, set the `autoTriggerCallbacks` property of the physics world to `true`.
2. Add `PhysicsCallbacks.ITriggerCallback` to the list of implemented interfaces in your script.
3. Implement the `OnTriggerBegin2D` and `OnTriggerEnd2D` methods of the interface, and include the code you want to run when contact starts and ends.
4. To activate the callback methods when contact occurs, on both shapes set the `triggerEvents` property of the shape to `true` and the `callbackTarget` property to `this`.
5. To enable the trigger, on the trigger shape, set the `isTrigger` property to `true`.

For an example, refer to the `PhysicsShapeTriggerCallback` example in the [PhysicsCore2D repository](https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master "https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master") on GitHub.

## Get contacts without a callback

To get information about contact between objects without a callback, use the event APIs of the world instance. For example, to get collisions that have begun, use the `PhysicsWorld.contactBeginEvents` method. For more information, refer to [`PhysicsWorld`](../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.html "../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.html").

**Important**: This approach is less safe because the methods return a `ReadOnlySpan` type that points directly to memory. For more information, refer to [Destroy Physics Core 2D API objects and manage memory](2d-physics-api-destroy.html "2d-physics-api-destroy.html").

## Additional resources

* [Introduction to collision in the Physics Core 2D API](2d-physics-api-interactions-introduction.html "2d-physics-api-interactions-introduction.html")
* [Configure collisions between Physics Core 2D API objects](2d-physics-api-collisions-enable.html "2d-physics-api-collisions-enable.html")
* [Check Physics Core 2D API intersections](2d-physics-api-raycasting.html "2d-physics-api-raycasting.html")
* [Body definition reference for the Physics Core 2D API](2d-physics-api-reference-body.html "2d-physics-api-reference-body.html")
* [Configure global Physics Core 2D API settings](../class-PhysicsCoreSettings2D.html "../class-PhysicsCoreSettings2D.html")

Configure collisions between Physics Core 2D API objects

Check Physics Core 2D API intersections

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-world.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Creating a scene with the Physics Core 2D API](../2d-physics-api/2d-physics-api-create-objects-landing.html "../2d-physics-api/2d-physics-api-create-objects-landing.html")
* Create a world with the Physics Core 2D API

Creating a scene with the Physics Core 2D API

Create an object with the Physics Core 2D API

# Create a world with the Physics Core 2D API

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

To create physics objects using the Physics Core 2D API, you first need to create a physics world.

## Prerequisites

Before you create a physics world, follow these steps:

1. Create a [MonoBehaviour script file](../class-MonoBehaviour.html "../class-MonoBehaviour.html"): from the main menu, select **Assets** > **Create** > **C# Script**.
2. To import the `Unity.U2D.Physics` API namespace, add `using Unity.U2D.Physics;` at the top of the script.

**Note:** You can use the API in any C# script, not only MonoBehaviour script files. But if you use a MonoBehaviour script file, you can configure physics properties in the **Inspector** window of a GameObject, move GameObjects, and attach sprites.

## Fetch the default world

Unity automatically creates a default world. To fetch it, follow these steps:

1. Get the `defaultWorld` property from the `PhysicsWorld` class.

   ```
   PhysicsWorld world = PhysicsWorld.defaultWorld;
   ```
2. Attach the script to a GameObject in your scene.
3. Enter Play mode to run the script.

To adjust the properties of the world, refer to [Configure global Physics Core 2D API settings](../class-PhysicsCoreSettings2D.html "../class-PhysicsCoreSettings2D.html").

Unity creates or recreates the default world at the following times:

* When the Editor starts.
* When you enter or exit Play mode.
* When your built application starts.

## Create your own world

To create your own world, follow these steps:

1. Create a public `PhysicsWorldDefinition` object that holds the world properties and displays them in the **Inspector** window. For example:

   ```
   public PhysicsWorldDefinition worldDefinition = new PhysicsWorldDefinition();
   ```

   A new definition has a set of default values. For example, gravity is set to –9.81f. For more information about definitions and changing the default values, refer to [Configure objects using definitions](2d-physics-api-definitions.html "2d-physics-api-definitions.html").

   You can also use `PhysicsWorld.defaultDefinition` to get a definition object with the default values.
2. Create a `PhysicsWorld` object with the definition. For example:

   ```
   PhysicsWorld world = PhysicsWorld.Create(worldDefinition);
   ```
3. Attach the script to a GameObject in your scene.
4. To adjust the properties of the world, modify the values in the **Inspector** window.

   To configure the world in your script instead, set the properties of the definition object before you create the world. For more information, refer to [Configure objects using definitions](2d-physics-api-definitions.html "2d-physics-api-definitions.html").
5. Enter Play mode to run the script and create the world.

## Pause a world

A world starts running as soon as you create it. To pause the simulation, set the [`paused`](../../ScriptReference/Unity.U2D.Physics.PhysicsWorld-paused.html "../../ScriptReference/Unity.U2D.Physics.PhysicsWorld-paused.html") property of the world object to `true`.

## Example

The following example fetches the default world and logs the gravity value to the **Console** window.

```
using UnityEngine;
using Unity.U2D.Physics;

public class GetDefaultWorld : MonoBehaviour
{
    void Awake()
    {
        // Fetch the default physics world
        PhysicsWorld world = PhysicsWorld.defaultWorld;

        // Log the gravity value to check the world is created
        Debug.Log("The gravity in this world is " + world.gravity);
    }    
}
```

## Additional resources

* [Create a physics object](2d-physics-api-physics-object.html "2d-physics-api-physics-object.html")
* [Configure global Physics Core 2D API settings](../class-PhysicsCoreSettings2D.html "../class-PhysicsCoreSettings2D.html")
* [PhysicsCore2D repository](https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master "https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master") on GitHub
* [World definition reference for the Physics Core 2D API](2d-physics-api-reference-world.html "2d-physics-api-reference-world.html")

Creating a scene with the Physics Core 2D API

Create an object with the Physics Core 2D API

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-physics-object.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Creating a scene with the Physics Core 2D API](../2d-physics-api/2d-physics-api-create-objects-landing.html "../2d-physics-api/2d-physics-api-create-objects-landing.html")
* Create an object with the Physics Core 2D API

Create a world with the Physics Core 2D API

Add a sprite to a Physics Core 2D API object

# Create an object with the Physics Core 2D API

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

After you [create a physics world](2d-physics-api-world.html "2d-physics-api-world.html"), you can add physics objects to the world.

An object is usually made up of two parts:

* A physics body, which defines the position, rotation, and velocity of the object. It doesn’t define an area.
* One or more physics shapes attached to the body, which define the area that interacts with other shapes. Unity also automatically draws the shapes as a debug visualization.

You can add any number of shapes to a physics body. You can create shapes with the following geometries:

* [Circle](../../ScriptReference/Unity.U2D.Physics.CircleGeometry.html "../../ScriptReference/Unity.U2D.Physics.CircleGeometry.html")
* [Capsule](../../ScriptReference/Unity.U2D.Physics.CapsuleGeometry.html "../../ScriptReference/Unity.U2D.Physics.CapsuleGeometry.html")
* [Polygon](../../ScriptReference/Unity.U2D.Physics.PolygonGeometry.html "../../ScriptReference/Unity.U2D.Physics.PolygonGeometry.html")
* [Segment](../../ScriptReference/Unity.U2D.Physics.SegmentGeometry.html "../../ScriptReference/Unity.U2D.Physics.SegmentGeometry.html")Segments are subsets of your player base, split apart by key differentiators. Viewing metrics and events by segment can reveal differences in-game behavior between different groups. [More info](../https://docs.unity.com/ugs/en-us/manual/analytics/manual/data-explorer-v2 "../https://docs.unity.com/ugs/en-us/manual/analytics/manual/data-explorer-v2")  
  See in [Glossary](../Glossary.html#segment "../Glossary.html#segment"), which creates a line
* [Chain segment](../../ScriptReference/Unity.U2D.Physics.ChainGeometry.html "../../ScriptReference/Unity.U2D.Physics.ChainGeometry.html"), which you use to create a series of connected line segments

## Create a physics body and physics shape

Follow these steps:

1. Create objects that hold the properties of the body and shapes. Make them `public` fields so they display their properties in the **Inspector** window. For example:

   ```
   public PhysicsBodyDefinition bodyDefinition = new PhysicsBodyDefinition();
   public PhysicsShapeDefinition shapeDefinition = new PhysicsShapeDefinition();
   ```

   A new definition has a set of default values. For more information about definitions and changing the default values, refer to [Configure 2D physics properties using a definition](2d-physics-api-definitions.html "2d-physics-api-definitions.html").

   You can also use `PhysicsBody.defaultDefinition` to get a definition object with the default values.
2. Use the `CreateBody` method of the world object to add a body to the world, and pass in the body definition.

   ```
   PhysicsBody myObject = world.CreateBody(bodyDefinition);
   ```
3. Create a shape using a geometry object, for example a `CircleGeometry` object. For example, the following creates a circle with a radius of 2 meters.

   ```
   CircleGeometry circleShape = new CircleGeometry { radius = 2f };
   ```
4. Attach the shape to the body using the `CreateShape` method of the body, and pass in the shape definition.

   ```
   myObject.CreateShape(circleShape, shapeDefinition);
   ```
5. If your script is in a `MonoBehaviour` class attached to a GameObject, adjust the properties of the body, the geometry, and the shape in the **Inspector** window.

   To configure the objects in your script instead, set the properties of the definition object before you create the objects. For more information, refer to [Configure 2D physics properties using a definition](2d-physics-api-definitions.html "2d-physics-api-definitions.html").
6. Enter Play mode to run the script and create the objects. Unity displays the shape in the Scene view and Game view as a debug visualization. The line on the shape points towards the rotation direction of the shape.

**Note**: By default, a physics body is static and isn’t affected by physics. To make it dynamic, in the **Inspector** window of the GameObject, set **Body Type** to **Dynamic**. For more information, refer to [Configure objects with definitions](2d-physics-api-definitions.html "2d-physics-api-definitions.html").

After you create a shape from geometry, the shape doesn’t change if you change the geometry object.

## Example

The following example creates a circle. Attach the script to a GameObject in your scene then enter Play mode to check the shape.

```
using UnityEngine;
using Unity.U2D.Physics;

public class CreateWorldAndObjects : MonoBehaviour
{
    // Declare definitions that contain default properties for the body and shape
    public PhysicsBodyDefinition bodyDefinition = PhysicsBodyDefinition.defaultDefinition;
    public PhysicsShapeDefinition shapeDefinition = PhysicsShapeDefinition.defaultDefinition;
 
    void Start()
    {
        // Get the default world
        PhysicsWorld world = PhysicsWorld.defaultWorld;

        // Create the physics body with the body definition
        PhysicsBody myObject = world.CreateBody(bodyDefinition);

        // Create the circle geometry
        CircleGeometry circleGeometry = new CircleGeometry { radius = 1.5f };

        // Create the shape with both the geometry and the shape definition
        myObject.CreateShape(circleGeometry, shapeDefinition);
    }
}
```

## Additional resources

* [Configure Physics Core 2D API objects with definitions](2d-physics-api-definitions.html "2d-physics-api-definitions.html")
* [`PhysicsBody.PhysicsTransform`](../../ScriptReference/Unity.U2D.Physics.PhysicsBody.PhysicsTransform.html "../../ScriptReference/Unity.U2D.Physics.PhysicsBody.PhysicsTransform.html")

Create a world with the Physics Core 2D API

Add a sprite to a Physics Core 2D API object

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-custom-data.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Configuring Physics Core 2D API scenes](../2d-physics-api/2d-physics-api-properties-landing.html "../2d-physics-api/2d-physics-api-properties-landing.html")
* Attach custom data to Physics Core 2D API objects

Configure global Physics Core 2D API settings

Collisions and interactions in the Physics Core 2D API

# Attach custom data to Physics Core 2D API objects

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

To attach custom data to an object you create using the Physics Core 2D API, use the `PhysicsUserData` type.

You can attach data to the following types:

* `World`
* `Body`
* `Shape`
* `Chain`
* `Joint`

Follow these steps:

1. Create a `PhysicsUserData` instance and populate it with your custom fields. For example:

   ```
   PhysicsUserData physicsUserData = new PhysicsUserData
       {
           customObject = this,
           customBool = true,
           customFloat = 123.4f,
           customInt = 567,
           customPhysicsMask = PhysicsMask.All
       };
   ```
2. Assign a `PhysicsUserData` instance to the `userData` property of the physics object. For example, to assign the custom data to a shape:

   ```
   myShape.userData = physicsUserData;
   ```
3. To fetch the data, for example when you [detect a collision](2d-physics-api-collision-handle.html "2d-physics-api-collision-handle.html"), get the `userData` property of the physics object. For example:

   ```
   Debug.Log(myShape.userData.intValue);
   ```

## Additional resources

* [Collisions and interactions in the Physics Core 2D API](2d-physics-api-interactions-landing.html "2d-physics-api-interactions-landing.html")
* [PhysicsCore2D repository](https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master "https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master") on GitHub

Configure global Physics Core 2D API settings

Collisions and interactions in the Physics Core 2D API

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-reference-joint-relative.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Reference for the Physics Core 2D API](../2d-physics-api/2d-physics-api-reference.html "../2d-physics-api/2d-physics-api-reference.html")
* Relative joint definition reference for the Physics Core 2D API

Hinge joint definition reference for the Physics Core 2D API

Slider joint definition reference for the Physics Core 2D API

# Relative joint definition reference for the Physics Core 2D API

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

Explore the properties you can use to configure a Physics Core 2D API relative joint in the Unity Editor.

A relative joint moves and rotates objects opposite to each other.

| **Property** | **Sub-property** | **Description** |
| --- | --- | --- |
| **Local Anchor A** | N/A | Sets where one end of the joint connects to the first body. |
| N/A | **Position** | Sets the position where the end of the joint connects, relative to the position of the first body. |
| N/A | **Rotation** | Sets the rotation of the anchor in degrees. |
| **Local Anchor B** | N/A | Sets where the other end of the joint connects to the second body. |
| N/A | **Position** | Sets the position where the end of the joint connects, relative to the position of the second body. |
| N/A | **Rotation** | Sets the rotation of the anchor in degrees. |
| **Linear Velocity** | N/A | Sets the target velocity vector for the objects. |
| **Angular Velocity** | N/A | Sets the target rotational velocity for the objects. |
| **Max Force** | N/A | Sets the amount of force the joint uses to reach the target velocity. |
| **Max Torque** | N/A | Sets the amount of rotational force the joint uses to reach the target rotational velocity. |
| **Spring Linear Frequency** | N/A | Sets the stiffness of a spring that connects the two bodies, and stretches and compresses to try to bring the bodies together. The strength of the pull is proportional to the current distance between the bodies. The units are in Hertz (cycles per second). A higher value makes the joint less stiff. The default is 0. |
| **Spring Angular Frequency** | N/A | Sets the stiffness of a spring that connects the angle of the two bodies. A higher value makes the joint less stiff. The default is 0. |
| **Spring Linear Damping** | N/A | Sets how quickly the spring settles. A higher value makes the spring settle more quickly. The default is 0. |
| **Spring Angular Damping** | N/A | Sets how quickly the rotation settles. A higher value makes the spring settle more quickly. The default is 0. |
| **Spring Max Force** | N/A | Sets the maximum linear force that the spring applies, in newtons. |
| **Spring Max Torque** | N/A | Sets the maximum rotational force that the spring applies, in newton-meters. |
| **Force Threshold** | N/A | Sets the amount of linear force that creates an `OnJointThreshold2D` event. |
| **Torque Threshold** | N/A | Sets the amount of rotational force that creates an `OnJointThreshold2D` event. |
| **Tuning Frequency** | N/A | Sets the overall stiffness of the joint in Hertz (cycles per second). A higher value makes the joint less stiff. |
| **Tuning Damping** | N/A | Sets how quickly overall the joint stops pulling or pushing. A higher value makes the joint settle more quickly. |
| **Draw Scale** | N/A | Scales the joint Unity draws as a debug visualization. For more information, refer to [Draw a debug visualization of objects](2d-physics-api-debug-drawing.html "2d-physics-api-debug-drawing.html"). |
| **Collide Connected** | N/A | Enables the shapes creating collision or trigger events when they come into contact with each other. For more information, refer to [Collisions and interactions in the Physics Core 2D API](2d-physics-api-interactions-landing.html "2d-physics-api-interactions-landing.html"). |
| **World Drawing** | N/A | Draws the joint when Unity draws the debug visualization of the world. For more information, refer to [Draw a debug visualization of objects](2d-physics-api-debug-drawing.html "2d-physics-api-debug-drawing.html"). |

## Additional resources

* [`PhysicsRelativeJointDefinition`](../../ScriptReference/Unity.U2D.Physics.PhysicsRelativeJointDefinition.html "../../ScriptReference/Unity.U2D.Physics.PhysicsRelativeJointDefinition.html")
* [Configure Physics Core 2D API scenes with definitions](2d-physics-api-definitions.html "2d-physics-api-definitions.html")
* [Configure global Physics Core 2D API settings](../class-PhysicsCoreSettings2D.html "../class-PhysicsCoreSettings2D.html")

Hinge joint definition reference for the Physics Core 2D API

Slider joint definition reference for the Physics Core 2D API

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-reference-shape.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Reference for the Physics Core 2D API](../2d-physics-api/2d-physics-api-reference.html "../2d-physics-api/2d-physics-api-reference.html")
* Shape definition reference for the Physics Core 2D API

Body definition reference for the Physics Core 2D API

Chain definition reference for the Physics Core 2D API

# Shape definition reference for the Physics Core 2D API

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

Explore the properties you can use to configure a physics shape in the Unity Editor. For more information, refer to [Create an object with the Physics Core 2D API](2d-physics-api-physics-object.html "2d-physics-api-physics-object.html").

## Contact Filter

The properties in the **Contact Filter** section determine which other shapes the shape collides with. For more information, refer to [Configure collisions between objects](2d-physics-api-collisions-enable.html "2d-physics-api-collisions-enable.html").

| Property | Description |
| --- | --- |
| **Categories** | Sets the layers this shape belongs to. |
| **Contacts** | Sets the layers this shape collides with. |
| **Group Index** | Assigns the shape to a group, and overrides the **Categories** and **Contacts** properties. Use the following values:  * 0: Assigns no group. The shape uses the **Categories** and **Contacts** properties to determine collisions. * Positive value: The shape always collides with other shapes that have the same **Group Index**. * Negative value: The shape doesn’t collide with other shapes that have the same **Group Index**. |

## Surface Material

The properties in the **Surface Material** section determine how the shape interacts with other shapes.

| Property | Description |
| --- | --- |
| **Friction** | Sets the coefficient of friction for this collider. A value of 0 means no friction, like ice. A value of 1 means very high friction, like rubber. The default is 0.6. |
| **Bounciness** | Sets how bouncy the surface is, and how much other colliders bounce off it. A value of 0 means the surface is not at all bouncy, like soft clay. A value of 1 means the surface is very bouncy, like rubber. The default is 0. |
| **Friction Mixing** | Determines the method Unity uses to mix the friction of two objects when they make contact. The options are:  * **Average**: Uses the average of the two values. * **Mean**: Uses the geometric mean of the two values. The geometric mean multiplies the two values then returns the square root. * **Multiply**: Multiplies the two values together. * **Minimum**: Uses the smaller value. * **Maximum**: Uses the larger value. |
| **Bounciness Mixing** | Determines the method Unity uses to mix the bounciness of two objects when they make contact. The options are:  * **Average**: Uses the average of the two values. * **Mean**: Uses the geometric mean of the two values. The geometric mean multiplies the two values then returns the square root. * **Multiply**: Multiplies the two values together. * **Minimum**: Uses the smaller value. * **Maximum**: Uses the larger value. |
| **Friction Priority** | Determines which shape contributes its **Friction Mixing** mode when two shapes come into contact. Unity uses the **Friction Mixing** mode from the shape with the highest **Friction Priority** value. If the two shapes have the same **Friction Priority** value, Unity uses the highest `SurfaceMaterial.MixingMode` enumeration value from the two shapes. |
| **Bounciness Priority** | Determines which shape contributes its **Bounciness Mixing** mode when two shapes come into contact. Unity uses the **Bounciness Mixing** mode from the shape with the highest **Bounciness Priority** value. If the two shapes have the same **Bounciness Priority** value, Unity uses the highest `SurfaceMaterial.MixingMode` enumeration value from the two shapes. |
| **Rolling Resistance** | Sets how resistant the shape is to rolling. The range of values is 0 to 1, where 0 means no rolling resistance and 1 means full rolling resistance. |
| **Tangent Speed** | Sets the speed the surface moves other objects that come into contact with it, in meters per second. For example, if you set **Tangent Speed** to 5, the surface acts like a conveyor belt that moves objects along the surface at 5 meters per second. You can use a positive or negative value to set the direction of movement. |
| **Custom Color** | Overrides the color Unity uses to draw the debug visualization of the shape. The alpha value is ignored. The default is [`Color.Clear`](../../ScriptReference/Color.Clear.html "../../ScriptReference/Color.Clear.html"), which is black with an alpha of 0, and means Unity uses different colors to represent the current state of the shape. For more information, refer to [Draw a debug visualization of objects](2d-physics-api-debug-drawing.html "2d-physics-api-debug-drawing.html"). |

## Other properties

| Property | Description |
| --- | --- |
| **Density** | Sets the density in kg/m2. The default is 1. Use this property to create a hollow shape for example. |
| **Is Trigger** | Enables the shape going through other shapes without generating a collision response. Instead, the shape generates a trigger event when another shape overlaps. For more information, refer to [Introduction to collision in the Physics Core 2D API](2d-physics-api-interactions-introduction.html "2d-physics-api-interactions-introduction.html"). |
| **Trigger Events** | Produces a trigger event when the shape starts and ends overlapping another shape. This property works whether you enable or disable **Is Trigger** on this shape. To fetch events, refer to [`PhysicsWorld.triggerBeginEvents`](../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.triggerBeginEvents.html "../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.triggerBeginEvents.html"). |
| **Contact Events** | Produces a contact event when the shape starts and ends contact with another shape. This property has no effect if the shape is attached to a body set to **Static**. To fetch events, refer to [`PhysicsWorld.contactBeginEvents`](../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.contactBeginEvents.html "../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.contactBeginEvents.html"). |
| **Hit Events** | Produces a hit event when the shape collides with another shape. This property has no effect if the shape is attached to a body set to **Static**. To fetch events, refer to [`PhysicsWorld.shapeHitEvents`](../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.shapeHitEvents.html "../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.shapeHitEvents.html"). |
| **Contact Filter Callbacks** | Calls the `IContactFilterCallback` method of the shape if it makes contact with another shape, so you can run your own code that determines whether the shapes should collide. |
| **Pre Solve Callbacks** | Calls the `OnPreSolve2D` method of the dynamic body before Unity calculates the collision response, so you can run your own code. |
| **Start Static Contacts** | Produces a contact event if the shape is attached to a body set to **Static**, and the shape makes contact with another shape. Enabling this property can reduce performance if you have many static shapes. |
| **Start Mass Update** | Updates the mass of the body when the shape is created. Disabling this property can improve performance if you add multiple shapes to the same body, but you must call [ApplyMassFromShapes](../../ScriptReference/Unity.U2D.Physics.PhysicsBody.ApplyMassFromShapes.html "../../ScriptReference/Unity.U2D.Physics.PhysicsBody.ApplyMassFromShapes.html") to recalculate after you add a shape. |
| **World Drawing** | Draws the shape when Unity draws the debug visualization of the world. For more information, refer to [Draw a debug visualization of objects](2d-physics-api-debug-drawing.html "2d-physics-api-debug-drawing.html"). |
| **Mover Data** | Controls how the shape reacts to [`PhysicsWorld.CastMover`](../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.CastMover.html "../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.CastMover.html") geometry that collides with it. The options are:  * **Push Limit**: Sets the amount the shape pushes against the geometry. * **Clip Velocity**: Enables the shape clipping the velocity of the geometry. |

## Additional resources

* [Create an object with the Physics Core 2D API](2d-physics-api-physics-object.html "2d-physics-api-physics-object.html")
* [Configure Physics Core 2D API scenes with definitions](2d-physics-api-definitions.html "2d-physics-api-definitions.html")
* [Configure global Physics Core 2D API settings](../class-PhysicsCoreSettings2D.html "../class-PhysicsCoreSettings2D.html")

Body definition reference for the Physics Core 2D API

Chain definition reference for the Physics Core 2D API

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-reference-joint-slider.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Reference for the Physics Core 2D API](../2d-physics-api/2d-physics-api-reference.html "../2d-physics-api/2d-physics-api-reference.html")
* Slider joint definition reference for the Physics Core 2D API

Relative joint definition reference for the Physics Core 2D API

Wheel joint definition reference for the Physics Core 2D API

# Slider joint definition reference for the Physics Core 2D API

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

Explore the properties you can use to configure a Physics Core 2D API slider joint in the Unity Editor.

A slider joint allows one body to restrict a second body so it can only slide along one axis. The axis is defined by the rotation of the first object.

| **Property** | **Sub-property** | **Description** |
| --- | --- | --- |
| **Local Anchor A** | N/A | Sets where one end of the joint connects to the first body. The rotation of this body determines the axis the second object can slide along. |
| N/A | **Position** | Sets the position where the end of the joint connects, relative to the position of the first body. |
| N/A | **Rotation** | Sets the rotation of the anchor in degrees. |
| **Local Anchor B** | N/A | Sets where the other end of the joint connects to the second body. |
| N/A | **Position** | Sets the position where the end of the joint connects, relative to the position of the second body. |
| N/A | **Rotation** | Sets the rotation of the anchor in degrees. |
| **Enable Spring** | N/A | Enables **Spring Target Translation**, **Spring Frequency**, and **Spring Damping**. The spring connects the two bodies, and stretches and compresses to try to bring the bodies together. The strength of the pull is proportional to the current distance between the bodies. |
| **Spring Target Translation** | N/A | Sets the target speed of the spring pulling and pushing. |
| **Spring Frequency** | N/A | Sets the stiffness of the spring in Hertz (cycles per second). A higher value makes the spring less stiff. The default is 0. |
| **Spring Damping** | N/A | Sets how quickly the spring stops pulling or pushing. A higher value makes the spring settle more quickly. The default is 0. |
| **Enable Motor** | N/A | **Enables Motor Speed** and **Max Motor Force**, which make the joint act as a motor to pull or push the two connected bodies. |
| **Motor Speed** | N/A | Sets the target motor speed, in meters per second. |
| **Max Motor Force** | N/A | Sets the maximum force that the motor applies to reach the target speed, in newtons. |
| **Enable Limit** | N/A | Enables **Min Distance Limit** and **Max Distance Limit**, which restrict the position of the second body. |
| **Lower Translation Limit** | N/A | Sets the minimum position for the second object in meters. |
| **Upper Translation Limit** | N/A | Sets the maximum position for the second object in meters. |
| **Force Threshold** | N/A | Sets the amount of linear force that creates an `OnJointThreshold2D` event. |
| **Torque Threshold** | N/A | Sets the amount of rotational force that creates an `OnJointThreshold2D` event. |
| **Tuning Frequency** | N/A | Sets the overall stiffness of the joint in Hertz (cycles per second). A higher value makes the joint less stiff. |
| **Tuning Damping** | N/A | Sets how quickly overall the joint stops pulling or pushing. A higher value makes the joint settle more quickly. |
| **Draw Scale** | N/A | Scales the joint Unity draws as a debug visualization. For more information, refer to [Draw a debug visualization of objects](2d-physics-api-debug-drawing.html "2d-physics-api-debug-drawing.html"). |
| **Collide Connected** | N/A | Enables the shapes creating collision or trigger events when they come into contact with each other. For more information, refer to [Collisions and interactions in the Physics Core 2D API](2d-physics-api-interactions-landing.html "2d-physics-api-interactions-landing.html"). |
| **World Drawing** | N/A | Draws the joint when Unity draws the debug visualization of the world. For more information, refer to [Draw a debug visualization of objects](2d-physics-api-debug-drawing.html "2d-physics-api-debug-drawing.html"). |

## Additional resources

* [`PhysicsSliderJointDefinition`](../../ScriptReference/Unity.U2D.Physics.PhysicsSliderJointDefinition.html "../../ScriptReference/Unity.U2D.Physics.PhysicsSliderJointDefinition.html")
* [Configure Physics Core 2D API scenes with definitions](2d-physics-api-definitions.html "2d-physics-api-definitions.html")
* [Configure global Physics Core 2D API settings](../class-PhysicsCoreSettings2D.html "../class-PhysicsCoreSettings2D.html")

Relative joint definition reference for the Physics Core 2D API

Wheel joint definition reference for the Physics Core 2D API

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-get-started-landing.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* Get started with the Physics Core 2D API

2D physics with the Physics Core 2D API

Introduction to the Physics Core 2D API

# Get started with the Physics Core 2D API

Learn about the Physics Core 2D API and how to create a 2D physics scene.

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

| **Topic** | **Description** |
| --- | --- |
| [Introduction to the Physics Core 2D API](2d-physics-api-introduction.html "2d-physics-api-introduction.html") | Learn about how the `Unity.U2D.Physics` API works and how it differs from Rigidbody 2D and Collider 2D components. |
| [Physics Core 2D API workflow](2d-physics-api-workflow.html "2d-physics-api-workflow.html") | Create a 2D scene with objects that react to physics using the Physics Core 2D API. |

## Additional resources

* [PhysicsCore2D repository](https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master "https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master") on GitHub

2D physics with the Physics Core 2D API

Introduction to the Physics Core 2D API

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-interactions-introduction.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Collisions and interactions in the Physics Core 2D API](../2d-physics-api/2d-physics-api-interactions-landing.html "../2d-physics-api/2d-physics-api-interactions-landing.html")
* Introduction to collision in the Physics Core 2D API

Collisions and interactions in the Physics Core 2D API

Configure collisions between Physics Core 2D API objects

# Introduction to collision in the Physics Core 2D API

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

In Unity, a collision happens when two objects occupy the same physical space.

To detect collision between Physics Core 2D API objects, Unity uses the `PhysicsShape` objects attached to the `PhysicsBody`. The shape defines the physics body for the purposes of physical collisions. The shape is similar to the Collider 2D component in the regular [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") system.

Shapes don’t need to be the same shape as the body, and you can add multiple shapes to one body.

For more information about adding a shape, refer to [Create a physics object](2d-physics-api-physics-object.html "2d-physics-api-physics-object.html").

## Collision types

In the Physics Core 2D API, collisions are enabled by default.

How a shape reacts to collisions depends on its type:

* Collider: The shape can’t enter other objects. When the shape makes contact with another shape, it reports a contact event. This is the default.
* Trigger: The shape goes through other objects. When the shape enters another shape, it reports a trigger event.

For more information, refer to [Configure collisions between Physics Core 2D API objects](2d-physics-api-collisions-enable.html "2d-physics-api-collisions-enable.html").

To detect collisions and overlaps using callbacks or events, refer to [Detect collisions between objects](2d-physics-api-collision-handle.html "2d-physics-api-collision-handle.html").

## Collision layers

Unity uses layers to determine which objects collide with each other.

By default the following applies:

* Objects use [GameObject layers](../Layers.html "../Layers.html"), and all objects are on the built-in layer called **Default**.
* Objects collide with objects on all other layers.

To change this behavior, change the layers that objects are on, and the layers they collide with. For more information, refer to [Configure collisions between 2D physics objects](2d-physics-api-collisions-enable.html "2d-physics-api-collisions-enable.html").

In the Physics Core 2D API, you can use a different set of 64 layers, instead of the standard set of 32 GameObject layers. For more information, refer to [Use up to 64 layers](2d-physics-api-collisions-enable.html#use-up-to-64-layers "2d-physics-api-collisions-enable.html#use-up-to-64-layers").

## Additional resources

* [Check Physics Core 2D API interactions by casting rays](2d-physics-api-raycasting.html "2d-physics-api-raycasting.html")
* [Optimize the Physics Core 2D API with multithreading](2d-physics-api-multithreading.html "2d-physics-api-multithreading.html")

Collisions and interactions in the Physics Core 2D API

Configure collisions between Physics Core 2D API objects

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-reference-body.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Reference for the Physics Core 2D API](../2d-physics-api/2d-physics-api-reference.html "../2d-physics-api/2d-physics-api-reference.html")
* Body definition reference for the Physics Core 2D API

World definition reference for the Physics Core 2D API

Shape definition reference for the Physics Core 2D API

# Body definition reference for the Physics Core 2D API

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

Explore the properties you can use to configure a physics body in the Unity Editor. For more information, refer to [Create an object with the Physics Core 2D API](2d-physics-api-physics-object.html "2d-physics-api-physics-object.html").

| **Property** | **Description** |
| --- | --- |
| **Body Type** | Sets how the body behaves in the physics simulation. The options are:  * **Dynamic**: The body has mass. Unity applies forces, collisions, and gravity to the body. * **Kinematic**: Unity applies no forces or gravity, but allows collisions with **Dynamic** bodies. Kinematic bodies move only when you manually reposition them or set their velocity. * **Static**: Unity applies no forces or gravity, but allows collisions with **Dynamic** bodies. |
| **Body Constraints** | Places restrictions on the movement and rotation of the body. The options are:  * **None**: Allows the body to move and rotate freely. * **Position X**: Stops the body moving along the x-axis. * **Position Y**: Stops the body moving along the y-axis. * **Position**: Stops the body moving along either the x-axis or the y-axis. * **Rotation**: Stops the body rotating around the z-axis. * **All**: Stops the body moving or rotating. |
| **Transform Write Mode** | Sets the method Unity uses to copy the position of the physics body to the Transform component on the GameObject. The options are:  * **Current**: Copies the position and rotation at the end of the physics update. * **Interpolate**: Copies the position and rotation interpolated between the previous state and the current state. * **Extrapolate**: Copies the next position and rotation, extrapolated from the current position, rotation, and velocities. * **Off**: Doesn’t copy the position or rotation.  For more information, refer to [Move a GameObject](2d-physics-api-move-gameobject.html "2d-physics-api-move-gameobject.html"). |
| **Position** | Sets the position of the body in world space. |
| **Rotation** | Sets the rotation of the body in degrees. |
| **Linear Velocity** | Sets the initial velocity of the body in meters per second. The default is 0. |
| **Angular Velocity** | Sets the initial rotational velocity of the body in degrees per second. The default is 0. |
| **Linear Damping** | Sets how quickly the linear velocity decreases, to simulate drag, air resistance, or friction. Low values produce a slower decay rate, so that the body moves faster for longer, like a heavy object. High values produce a faster decay rate, so that the body slows down over a short amount of time, like a lightweight object. The default is 0. |
| **Angular Damping** | Sets how quickly the angular velocity decreases, to simulate drag, air resistance, or friction. The default is 0. |
| **Gravity Scale** | Scales the gravity applied to the body. Use a positive value to apply gravity in the same direction, a negative value to reverse gravity, or 0 to apply no gravity. The default is 1, which means gravity isn’t scaled up or down. |
| **Sleep Threshold** | Sets the speed below which Unity temporarily removes the body from physics calculations to save processor time. The value is in meters per second. The default is 0.05. |
| **Fast Rotation Allowed** | Removes the limit on how fast a physics body rotates. The limit avoids forces becoming too large and objects passing through each other incorrectly. Enabling this property is recommended only for circular objects. For more information, refer to [Move a GameObject](2d-physics-api-move-gameobject.html "2d-physics-api-move-gameobject.html"). |
| **Fast Collisions Allowed** | Force continuous collision detection for this body. Enable this property for a very fast-moving object that passes through other objects. Enabling this setting can reduce performance. For more information, refer to [Configure collisions between Physics Core 2D API objects](2d-physics-api-collisions-enable.html "2d-physics-api-collisions-enable.html"). |
| **Sleeping Allowed** | Removes the body from physics calculations when it’s not moving or colliding, to save processor time. The recommended best practice is to leave this property enabled. |
| **Awake** | Sets the body as awake rather than in the sleep state. |
| **Enabled** | Removes the body from the physics simulation, but keeps the body and its handles alive. Enabling this property also removes any shapes or joints attached to the body from the physics simulation. |
| **World Drawing** | Draws the body when Unity draws the debug visualization of the world. For more information, refer to [Draw a debug visualization of objects](2d-physics-api-debug-drawing.html "2d-physics-api-debug-drawing.html"). |

## Additional resources

* [Create an object with the Physics Core 2D API](2d-physics-api-physics-object.html "2d-physics-api-physics-object.html")
* [Configure Physics Core 2D API scenes with definitions](2d-physics-api-definitions.html "2d-physics-api-definitions.html")
* [Configure global Physics Core 2D API settings](../class-PhysicsCoreSettings2D.html "../class-PhysicsCoreSettings2D.html")
* [Shape definition reference for the Physics Core 2D API](2d-physics-api-reference-shape.html "2d-physics-api-reference-shape.html")

World definition reference for the Physics Core 2D API

Shape definition reference for the Physics Core 2D API

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-move-gameobject.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Creating a scene with the Physics Core 2D API](../2d-physics-api/2d-physics-api-create-objects-landing.html "../2d-physics-api/2d-physics-api-create-objects-landing.html")
* Move a GameObject with the Physics Core 2D API

Add a sprite to a Physics Core 2D API object

Draw a debug visualization of Physics Core 2D API objects

# Move a GameObject with the Physics Core 2D API

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

By default, when you [create an object with the Physics Core 2D API](2d-physics-api-physics-object.html "2d-physics-api-physics-object.html"), the object isn’t connected to GameObjects in the scene.

To move a GameObject, configure the physics object to update the Transform component of the GameObject.

Follow these steps:

1. To enable physics bodies updating Transform components globally, set the `TransformWriteMode` property of the world to [`Fast2D`](../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.TransformWriteMode.Fast2D.html "../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.TransformWriteMode.Fast2D.html") or [`Slow2D`](../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.TransformWriteMode.Slow2D.html "../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.TransformWriteMode.Slow2D.html").
2. To enable the physics body updating Transform components, set its `TransformWriteMode` to `Current`.
3. To attach the Transform component of the GameObject to the physics body, set the `transformObject` property to the Transform component.

   **Note**: The `transformObject` property is available only in a C# script, not in the **Inspector** window of a public `PhysicsBodyDefinition` object.
4. Make sure the `type` property of the physics body is set to `PhysicsBody.BodyType.Dynamic`.

For example, attach the following script to a GameObject, then enter Play mode. The physics body falls under gravity, and updates the position in the Transform component in the **Inspector** window.

```
using UnityEngine;
using Unity.U2D.Physics;

public class MoveGameObject : MonoBehaviour
{
    public PhysicsWorld world;
    public PhysicsWorldDefinition worldDefinition = PhysicsWorldDefinition.defaultDefinition;

    void Awake()
    {
        // Enable physics bodies updating transforms
        worldDefinition.transformWriteMode = PhysicsWorld.TransformWriteMode.Fast2D;
        world = PhysicsWorld.Create(worldDefinition);
    }    

    void Start()
    {
        // Create a body and shape 
        PhysicsBody circleBody = world.CreateBody();
        CircleGeometry circleGeometry = new CircleGeometry { radius = 2f };
        circleBody.CreateShape(circleGeometry);
        
        // Set body to dynamic so it falls under gravity
        circleBody.type = PhysicsBody.BodyType.Dynamic; 

        // Enable this physics body updating transforms
        circleBody.transformWriteMode = PhysicsBody.TransformWriteMode.Current;

        // Set the updated transform as the transform of this GameObject
        circleBody.transformObject = transform;
    }
}
```

## Rotate objects more quickly

By default, Unity sets a limit on how fast a physics body rotates, to avoid forces becoming too large and objects passing through each other incorrectly. To remove the limit, set the **Fast Rotation Allowed** property of the body to `true`. This property is recommended only for circular objects.

## Interpolate positions

By default, the physics body updates the Transform component after Unity finishes calculating the physics simulation. To interpolate positions between simulation steps instead, set the `TransformWriteMode` of the physics body to `Interpolate` or `Extrapolate`.

## Additional resources

* [GameObjects](../working-with-gameobjects.html "../working-with-gameobjects.html")The fundamental object in Unity scenes, which can represent characters, props, scenery, cameras, waypoints, and more. A GameObject’s functionality is defined by the Components attached to it. [More info](../class-GameObject.html "../class-GameObject.html")  
  See in [Glossary](../Glossary.html#GameObject "../Glossary.html#GameObject")
* [Add a sprite to a Physics Core 2D API object](2d-physics-api-add-sprite.html "2d-physics-api-add-sprite.html")
* [World definition reference for the Physics Core 2D API](2d-physics-api-reference-world.html "2d-physics-api-reference-world.html")
* [Body definition reference for the Physics Core 2D API](2d-physics-api-reference-body.html "2d-physics-api-reference-body.html")

Add a sprite to a Physics Core 2D API object

Draw a debug visualization of Physics Core 2D API objects

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-raycasting.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Collisions and interactions in the Physics Core 2D API](../2d-physics-api/2d-physics-api-interactions-landing.html "../2d-physics-api/2d-physics-api-interactions-landing.html")
* Check Physics Core 2D API intersections

Detect collisions between Physics Core 2D API objects

Use 2D physics in 3D space using the Physics Core 2D API

# Check Physics Core 2D API intersections

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

To check whether 2D physics objects overlap or will collide, also known as intersections, use Physics Core 2D API query methods.

Use one of the following methods:

* The [`PhysicsQuery`](../../ScriptReference/Unity.U2D.Physics.PhysicsQuery.html "../../ScriptReference/Unity.U2D.Physics.PhysicsQuery.html") API to check for overlaps. For example, `PhysicsQuery.CapsuleAndCircle` to check whether a capsule overlaps with a circle.
* The `Intersect` method of a geometry object to check if it overlaps with another geometry object. For example, [`CapsuleGeometry.Intersect`](../../ScriptReference/Unity.U2D.Physics.CapsuleGeometry.Intersect.html "../../ScriptReference/Unity.U2D.Physics.CapsuleGeometry.Intersect.html").

The world object also has the following methods:

* Methods that cast rays or shapes. For example, [`PhysicsWorld.CastRay`](../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.CastRay.html "../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.CastRay.html") or [`PhysicsWorld.CastGeometry`](../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.CastGeometry.html "../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.CastGeometry.html").
* Overlap test methods that return true if a point or shape overlaps another object. For example, [`PhysicsWorld.TestOverlapAABB`](../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.TestOverlapAABB.html "../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.TestOverlapAABB.html").
* Overlap methods that return the objects that overlap a point or shape. For example, [`PhysicsWorld.OverlapCircle`](../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.OverlapCircle.html "../../ScriptReference/Unity.U2D.Physics.PhysicsWorld.OverlapCircle.html").

All methods are thread-safe. For more information, refer to [Optimize the Physics Core 2D API with multithreading](2d-physics-api-multithreading.html "2d-physics-api-multithreading.html").

**Important**: These methods return `NativeArray` types, which you must dispose of to free the memory they use. For more information, refer to [Destroy objects and manage memory](2d-physics-api-destroy.html "2d-physics-api-destroy.html").

## Example

To cast rays to check whether a shape will collide with other shapes, use the `CastGeometry` API.

For example, the following script checks if a small falling circle will collide with objects underneath it. Attach the script to a GameObject and enter Play mode, then use the **Big Circle** checkbox to toggle an object underneath the falling circle.

```
using UnityEngine;
using Unity.U2D.Physics;
using Unity.Collections;

public class CastGeometryExample : MonoBehaviour
{
    private PhysicsWorld world;
    public bool BigCircle;

    void Start()
    {
        world = PhysicsWorld.defaultWorld;

        // Create a small falling circle
        CircleGeometry object1Geometry = CircleGeometry.Create(0.5f, new Vector2(0.5f, 8f));
        PhysicsBody object1 = world.CreateBody(new PhysicsBodyDefinition
        { 
            position = object1Geometry.center,
            type = PhysicsBody.BodyType.Dynamic
        });
        object1.CreateShape(object1Geometry);

        if (BigCircle)
        {
            // Create a larger static circle below
            CircleGeometry object2Geometry = CircleGeometry.Create(3f, new Vector2(0f, 0f));
            PhysicsBody object2 = world.CreateBody(new PhysicsBodyDefinition
            { 
                position = object2Geometry.center,
                type = PhysicsBody.BodyType.Static
            });
            object2.CreateShape(object2Geometry);
        }

        // Set translation and filter for the cast
        Vector2 translation = new Vector2(0, -10f); // Move downwards
        PhysicsQuery.QueryFilter filter = new PhysicsQuery.QueryFilter();

        // Cast the circle geometry through the world
        NativeArray<PhysicsQuery.WorldCastResult> results = world.CastGeometry(object1Geometry, translation, filter, PhysicsQuery.WorldCastMode.Closest, Allocator.Temp);

        if (results.Length > 0)
        {
            Debug.Log("Collision will occur!");
        }

        // Dispose of the NativeArray to free memory
        results.Dispose();
    }
}
```

## Additional resources

* [Introduction to collision in the Physics Core 2D API](2d-physics-api-interactions-introduction.html "2d-physics-api-interactions-introduction.html")
* [`PhysicsAABB`](../../ScriptReference/Unity.U2D.Physics.PhysicsAABB.html "../../ScriptReference/Unity.U2D.Physics.PhysicsAABB.html")

Detect collisions between Physics Core 2D API objects

Use 2D physics in 3D space using the Physics Core 2D API

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-collisions-enable.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Collisions and interactions in the Physics Core 2D API](../2d-physics-api/2d-physics-api-interactions-landing.html "../2d-physics-api/2d-physics-api-interactions-landing.html")
* Configure collisions between Physics Core 2D API objects

Introduction to collision in the Physics Core 2D API

Detect collisions between Physics Core 2D API objects

# Configure collisions between Physics Core 2D API objects

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

In the Physics Core 2D API, collisions are enabled by default.

By default the following applies:

* Objects use [GameObject layers](../Layers.html "../Layers.html"), and all objects are on the built-in layer called **Default**.
* Objects collide with objects on all other layers.
* You can use up to 32 layers.

To change this behaviour, do the following:

1. Set the Physics Core 2D API to use its own set of 64 layers, instead of GameObject layers.
2. Configure which layers objects are on, and create layer masks that set which layers an object interacts with.

**Note:** To configure how a physics object reacts to collisions, for example how bouncy it is, refer to [Configure Physics Core 2D API scenes with definitions](2d-physics-api-definitions.html "2d-physics-api-definitions.html").

## Set the API to use its own set of layers

Follow these steps:

1. Create and assign a Physics Core Settings 2D asset. For more information, refer to [Configure global 2D physics settings](../class-PhysicsCoreSettings2D.html "../class-PhysicsCoreSettings2D.html").
2. In the **Project Settings** window, select **PhysicsCore 2D** > **Settings**.
3. In the **Global** section, enable **Use Physics Layers**.

The `PhysicsMask` API now uses the layers in the **Layers** section of the **Settings** window.

Use the **Layers** tab to add, edit, or remove layers. For more information, refer to [PhysicsCore 2D reference](../class-PhysicsCore2DProjectSettings.html "../class-PhysicsCore2DProjectSettings.html").

## Change which objects collide in the Editor

Follow these steps:

1. Create the layers you need. For more information, refer to [PhysicsCore 2D reference](../class-PhysicsCore2DProjectSettings.html "../class-PhysicsCore2DProjectSettings.html").
2. [Create a physics object](2d-physics-api-physics-object.html "2d-physics-api-physics-object.html") with a public `PhysicsShapeDefinition` and attach it to a GameObject.
3. Select the GameObject, then in the **Inspector** window open the **Contact Filter** dropdown.
4. Set **Categories** to the layers you want the object to be on. For example, the first built-in layer called **Default**.
5. Set **Contacts** to the layers you want the object to collide with. For example **Nothing** for no layers.

## Change which objects collide in a script

Follow these steps:

1. Create the layers you need. For more information, refer to [PhysicsCore 2D reference](../class-PhysicsCore2DProjectSettings.html "../class-PhysicsCore2DProjectSettings.html").
2. Create a `PhysicsMask` object with the layer you want the object to be on. For example:

   ```
   PhysicsMask objectLayer = PhysicsLayers.GetLayerMask("Car");
   ```

   `PhysicsLayers.GetLayerMask` gets the layer mask whether you’re using GameObject layers or the Physics Core 2D API layers.
3. Create another `PhysicsMask` object with the layers you want the object to collide with.

   ```
   PhysicsMask objectLayer = PhysicsLayers.GetLayerMask("Walls");
   ```
4. Create a `ContactFilter` object with the two physics layer masks. For example:

   ```
   PhysicsShape.ContactFilter myContactFilter = new PhysicsShape.ContactFilter { categories = objectLayer, contacts = contactLayer },
   ```

   You can also use `PhysicsMask.All` to represent all layers, or `PhysicsMask.None` to represent no layers.
5. Assign the `ContactFilter` to the `PhysicsShape` when you create it. For example:

   ```
   PhysicsShapeDefinition shapeDefinition = new PhysicsShapeDefinition{
       contactFilter = myContactFilter
   };
   ```

If `PhysicsMask` is a bitmask rather than a set of layers, add the `PhysicsMask.ShowAsPhysicsMask` attribute. Unity then displays the mask as bit values.

For more information, refer to [`PhysicsMask`](../../ScriptReference/Unity.U2D.Physics.PhysicsMask.html "../../ScriptReference/Unity.U2D.Physics.PhysicsMask.html").

## Prevent objects passing through each other

Because physics bodies move in steps, fast-moving objects can sometimes pass through other objects without activating a collision. This is called tunnelling.

The 2D physics system automatically uses continuous collision detection to prevent tunnelling when dynamic objects approach static objects. However if a very fast-moving object still passes through another object, enable the `fastCollisionsAllowed` property of the physics body to force continuous collision detection. Enabling this setting can reduce performance.

## Example

The following example sets a falling circle to be on the **MyNewLayer** layer and collide only with other **MyNewLayer** layer objects. It passes through the larger circle that’s in the default layer.

To use the example:

1. Create a Physics Core Settings 2D asset, enable **Use Full Layers**, and add a layer called **MyNewLayer**.
2. Attach the script to a GameObject in your scene, and enter Play mode.

```
using UnityEngine;
using Unity.U2D.Physics;

public class ContactFilters : MonoBehaviour
{
    void Start()
    {
        CircleGeometry smallCircleShape = new CircleGeometry{ radius = 0.5f };
        CircleGeometry largeCircleShape = new CircleGeometry{ radius = 3f };

        PhysicsWorld world = PhysicsWorld.defaultWorld;

        // Create a small falling circle
        PhysicsBody object1 = world.CreateBody(new PhysicsBodyDefinition
        { 
            position = new Vector2(0.5f, 8f),
            type = PhysicsBody.BodyType.Dynamic
        });

        // Create a shape on the MyNewLayer layer, which only collides with the MyNewLayer layer
        PhysicsMask objectLayer = PhysicsLayers.GetLayerMask("MyNewLayer");
        PhysicsMask collisionLayer = PhysicsLayers.GetLayerMask("MyNewLayer");
        PhysicsShape.ContactFilter contactFilter = new PhysicsShape.ContactFilter { 
            categories = objectLayer,
            contacts = collisionLayer
        };
        PhysicsShapeDefinition smallCircleDefinition = new PhysicsShapeDefinition{
            contactFilter = contactFilter
        };
        object1.CreateShape(smallCircleShape, smallCircleDefinition);

        // Create a larger static circle below, on the default layer
        PhysicsBody object2 = world.CreateBody(new PhysicsBodyDefinition
        { 
            position = new Vector2(0f, 0f),
            type = PhysicsBody.BodyType.Static
        });
        object2.CreateShape(largeCircleShape);

    }
}
```

## Additional resources

* [Introduction to collision in the Physics Core 2D API](2d-physics-api-interactions-introduction.html "2d-physics-api-interactions-introduction.html")
* [Detect collisions between Physics Core 2D API objects](2d-physics-api-collision-handle.html "2d-physics-api-collision-handle.html")
* [PhysicsCore2D repository](https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master "https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master") on GitHub
* [Body definition reference for the Physics Core 2D API](2d-physics-api-reference-body.html "2d-physics-api-reference-body.html")
* [Configure global Physics Core 2D API settings](../class-PhysicsCoreSettings2D.html "../class-PhysicsCoreSettings2D.html")

Introduction to collision in the Physics Core 2D API

Detect collisions between Physics Core 2D API objects

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-reference.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* Reference for the Physics Core 2D API

Optimize the Physics Core 2D API with multithreading

World definition reference for the Physics Core 2D API

# Reference for the Physics Core 2D API

Explore the properties and settings you can use to configure the global settings of the Physics Core 2D API, and set the default values for objects like worlds, bodies, and shapes.

| **Topic** | **Description** |
| --- | --- |
| [World definition reference](2d-physics-api-reference-world.html "2d-physics-api-reference-world.html") | Explore the properties you can use to configure a physics world in the Unity Editor. |
| [Body definition reference](2d-physics-api-reference-body.html "2d-physics-api-reference-body.html") | Explore the properties you can use to configure a physics body in the Editor. |
| [Shape definition reference](2d-physics-api-reference-shape.html "2d-physics-api-reference-shape.html") | Explore the properties you can use to configure a physics shape in the Editor. |
| [Chain definition reference](2d-physics-api-reference-chain.html "2d-physics-api-reference-chain.html") | Explore the properties you can use to configure a physics chain in the Editor. |
| [Distance joint definition reference](2d-physics-api-reference-joint-distance.html "2d-physics-api-reference-joint-distance.html") | Explore the properties you can use to configure a distance joint in the Editor. |
| [Fixed joint definition reference](2d-physics-api-reference-joint-fixed.html "2d-physics-api-reference-joint-fixed.html") | Explore the properties you can use to configure a fixed joint in the Editor. |
| [Hinge joint definition reference](2d-physics-api-reference-joint-hinge.html "2d-physics-api-reference-joint-hinge.html") | Explore the properties you can use to configure a hinge joint in the Editor. |
| [Relative joint definition reference](2d-physics-api-reference-joint-relative.html "2d-physics-api-reference-joint-relative.html") | Explore the properties you can use to configure a relative joint in the Editor. |
| [Slider joint definition reference](2d-physics-api-reference-joint-slider.html "2d-physics-api-reference-joint-slider.html") | Explore the properties you can use to configure a slider joint in the Editor. |
| [Wheel joint definition reference](2d-physics-api-reference-joint-wheel.html "2d-physics-api-reference-joint-wheel.html") | Explore the properties you can use to configure a wheel joint in the Editor. |

## Additional resources

* [Configure global Physics Core 2D API settings](../class-PhysicsCoreSettings2D.html "../class-PhysicsCoreSettings2D.html")
* [PhysicsCore 2D reference](../class-PhysicsCore2DProjectSettings.html "../class-PhysicsCore2DProjectSettings.html") in the Project Settings window.

Optimize the Physics Core 2D API with multithreading

World definition reference for the Physics Core 2D API

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-connect-combine-shapes.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Creating a scene with the Physics Core 2D API](../2d-physics-api/2d-physics-api-create-objects-landing.html "../2d-physics-api/2d-physics-api-create-objects-landing.html")
* Combine Physics Core 2D API shapes

Draw a debug visualization of Physics Core 2D API objects

Connect Physics Core 2D API objects with joints

# Combine Physics Core 2D API shapes

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

To combine physics shapes into a compound shape, create a composer using a `PhysicsComposer` object. For example, create a car shape by combining a car body and two wheels.

Follow these steps:

1. At the top of your script, import the `Unity.Collections` library that contains the allocator APIs the composer uses:

   ```
   using Unity.Collections;
   ```
2. Create the `Geometry` shapes you want to combine. For more information, refer to [Create a physics object](2d-physics-api-physics-object.html "2d-physics-api-physics-object.html").
3. Create a new `PhysicsComposer` object. Pass in an allocator, which creates temporary memory for building up the combined object. For example:

   ```
   PhysicsComposer physicsComposer = PhysicsComposer.Create(Allocator.Temp);
   ```

   For more information about allocators, refer to [Allocator](../../ScriptReference/Unity.Collections.Allocator.html "../../ScriptReference/Unity.Collections.Allocator.html").
4. Add each object to the composer as a layer, specifying its geometry, its position, and how to combine the shape with the existing layers. For example:

   ```
   physicsComposer.AddLayer(circleGeometry, PhysicsTransform.identity, PhysicsComposer.Operation.OR);
   ```

   For more information about `Operation`, refer to the [Layer operations](#layer-operations "#layer-operations") section.
5. Create the combined shape using `CreatePolygonGeometry`. Pass in a scale, and an allocator that creates the memory to store the combined shape. For example:

   ```
   using NativeArray<PolygonGeometry> combinedShape = composer.CreatePolygonGeometry(new Vector2(1f, 1f), Allocator.Temp);
   ```

   **Note**: `using` automatically disposes of the memory allocated for the `NativeArray` when it goes out of scope. For more information, refer to [Destroy Physics Core 2D API objects and manage memory](2d-physics-api-destroy.html "2d-physics-api-destroy.html").
6. Create a body with the combined shape using the `CreateShapeBatch` method. For example:

   ```
   body.CreateShapeBatch(combinedShape, PhysicsShapeDefinition.defaultDefinition);
   ```

The `PhysicsComposer` API combines `CircleGeometry`, `CapsuleGeometry`, `PolygonGeometry`, `PhysicsShape`, or any closed region defined by a set of `Vector2` points.

## Layer operations

The following `PhysicsComposer.Operation` operations are available:

* `OR`: Adds the shape.
* `AND`: Keeps only the overlapping areas between the new shape and the existing shape.
* `NOT`: Subtracts the new shape from the existing shapes.
* `XOR`: Removes overlapping areas, but keeps non-overlapping areas.

## Example

The following example combines a circle and a capsule shape. Attach this script to a GameObject in a scene, then enter Play mode to check the combined shape.

```
using UnityEngine;
using Unity.U2D.Physics;
using Unity.Collections;

public class CombineShapes : MonoBehaviour
{
    // Create the definition for a circle object
    public CircleGeometry MyCircleGeometry = CircleGeometry.defaultGeometry;
    public PhysicsTransform CircleTransform = new Vector2(0f, 0f);

    // Create the definition for a capsule object
    public CapsuleGeometry MyCapsuleGeometry = CapsuleGeometry.defaultGeometry;
    public PhysicsTransform CapsuleTransform = new Vector2(0.75f, 0f);

    private void Awake()
    {
        PhysicsWorld m_PhysicsWorld = PhysicsWorld.defaultWorld;
        
        // Create a composer to combine shapes
        PhysicsComposer composer = PhysicsComposer.Create(Allocator.Temp);
        
        // Add both shapes to the composer
        composer.AddLayer(MyCircleGeometry, CircleTransform);
        composer.AddLayer(MyCapsuleGeometry, CapsuleTransform, PhysicsComposer.Operation.OR);

        // Combine the shapes
        using NativeArray<PolygonGeometry> combinedShape = composer.CreatePolygonGeometry(new Vector2(1f, 1f), Allocator.Temp);
        
        // Create a body with the combined shapes
        PhysicsBody body = m_PhysicsWorld.CreateBody();       
        body.CreateShapeBatch(combinedShape, PhysicsShapeDefinition.defaultDefinition);

        // Destroy the composer to also destroy the temporary allocator.
        composer.Destroy();
    }   
}
```

## Additional resources

* [Connect Physics Core 2D API objects with joints](2d-physics-api-joints.html "2d-physics-api-joints.html")
* [PhysicsCore2D repository](https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master "https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master") on GitHub.

Draw a debug visualization of Physics Core 2D API objects

Connect Physics Core 2D API objects with joints

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-reference-joint-fixed.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Reference for the Physics Core 2D API](../2d-physics-api/2d-physics-api-reference.html "../2d-physics-api/2d-physics-api-reference.html")
* Fixed joint definition reference for the Physics Core 2D API

Distance joint definition reference for the Physics Core 2D API

Hinge joint definition reference for the Physics Core 2D API

# Fixed joint definition reference for the Physics Core 2D API

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

Explore the properties you can use to configure a Physics Core 2D API fixed joint in the Unity Editor.

A fixed joint fixes two bodies to the same position and rotation with a spring.

| **Property** | **Sub-property** | **Description** |
| --- | --- | --- |
| **Local Anchor A** | N/A | Sets where one end of the joint connects to the first body. |
| N/A | **Position** | Sets the position where the end of the joint connects, relative to the position of the first body. |
| N/A | **Rotation** | Sets the rotation of the anchor in degrees. |
| **Local Anchor B** | N/A | Sets where the other end of the joint connects to the second body. |
| N/A | **Position** | Sets the position where the end of the joint connects, relative to the position of the second body. |
| N/A | **Rotation** | Sets the rotation of the anchor in degrees. |
| **Linear Frequency** | N/A | Sets the stiffness of the spring that tries to keep the positions of the two bodies the same, in Hertz (cycles per second). A higher value makes the joint less stiff. The default is 0. |
| **Linear Damping** | N/A | Sets how quickly the spring stops pulling or pushing. A higher value makes the joint settle more quickly. The default is 0. |
| **Angular Frequency** | N/A | Sets the stiffness of the spring that tries to keep the rotation of the two bodies the same, in Hertz (cycles per second). A higher value makes the joint’s rotation less stiff. The default is 0. |
| **Angular Damping** | N/A | Sets how quickly the spring stops rotating. A higher value makes the rotation of the joint settle more quickly. The default is 0. |
| **Force Threshold** | N/A | Sets the amount of linear force that creates an `OnJointThreshold2D` event. |
| **Torque Threshold** | N/A | Sets the amount of rotational force that creates an `OnJointThreshold2D` event. |
| **Tuning Frequency** | N/A | Sets the overall stiffness of the joint in Hertz (cycles per second). A higher value makes the joint less stiff. |
| **Tuning Damping** | N/A | Sets how quickly overall the joint stops pulling or pushing. A higher value makes the joint settle more quickly. |
| **Draw Scale** | N/A | Scales the joint Unity draws as a debug visualization. For more information, refer to [Draw a debug visualization of objects](2d-physics-api-debug-drawing.html "2d-physics-api-debug-drawing.html"). |
| **Collide Connected** | N/A | Enables the shapes creating collision or trigger events when they come into contact with each other. For more information, refer to [Collisions and interactions in the Physics Core 2D API](2d-physics-api-interactions-landing.html "2d-physics-api-interactions-landing.html"). |
| **World Drawing** | N/A | Draws the joint when Unity draws the debug visualization of the world. For more information, refer to [Draw a debug visualization of objects](2d-physics-api-debug-drawing.html "2d-physics-api-debug-drawing.html"). |

## Additional resources

* [`PhysicsFixedJointDefinition`](../../ScriptReference/Unity.U2D.Physics.PhysicsFixedJointDefinition.html "../../ScriptReference/Unity.U2D.Physics.PhysicsFixedJointDefinition.html")
* [Configure Physics Core 2D API scenes with definitions](2d-physics-api-definitions.html "2d-physics-api-definitions.html")
* [Configure global Physics Core 2D API settings](../class-PhysicsCoreSettings2D.html "../class-PhysicsCoreSettings2D.html")

Distance joint definition reference for the Physics Core 2D API

Hinge joint definition reference for the Physics Core 2D API

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-interactions-landing.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* Collisions and interactions in the Physics Core 2D API

Attach custom data to Physics Core 2D API objects

Introduction to collision in the Physics Core 2D API

# Collisions and interactions in the Physics Core 2D API

Combine or connect shapes, and enable and detect contact between physics objects using the Physics Core 2D API.

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

| **Topic** | **Description** |
| --- | --- |
| [Introduction to collision in the Physics Core 2D API](2d-physics-api-interactions-introduction.html "2d-physics-api-interactions-introduction.html") | Learn about collisions between 2D physics objects, including collision types, layers, and layer masks. |
| [Configure collisions between objects](2d-physics-api-collisions-enable.html "2d-physics-api-collisions-enable.html") | Change which objects collide with which using layers and masks, and enable using 64 layers instead of 32. |
| [Detect collisions between objects](2d-physics-api-collision-handle.html "2d-physics-api-collision-handle.html") | To detect when collisions occur and respond to them, use collision callback methods or event methods. |
| [Check Physics Core 2D API intersections](2d-physics-api-raycasting.html "2d-physics-api-raycasting.html") | To check whether 2D physics objects overlap or will collide, also known as intersections, use query methods. |

## Additional resources

* [Optimize the Physics Core 2D API with multithreading](2d-physics-api-multithreading.html "2d-physics-api-multithreading.html")
* [PhysicsCore2D repository](https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master "https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master") on GitHub

Attach custom data to Physics Core 2D API objects

Introduction to collision in the Physics Core 2D API

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/2d-physics-api/2d-physics-api-joints.html

* [2D game development](../Unity2D.html "../Unity2D.html")
* [2D physics with the Physics Core 2D API](../2d-physics-api/2d-physics-api-landing.html "../2d-physics-api/2d-physics-api-landing.html")
* [Creating a scene with the Physics Core 2D API](../2d-physics-api/2d-physics-api-create-objects-landing.html "../2d-physics-api/2d-physics-api-create-objects-landing.html")
* Connect Physics Core 2D API objects with joints

Combine Physics Core 2D API shapes

Destroy Physics Core 2D API objects and manage memory

# Connect Physics Core 2D API objects with joints

**Note**: This documentation is about writing C# scripts using the `Unity.U2D.Physics` API. To use 2D physics in the Unity Editor using components like the Rigidbody 2D component, refer to [2D physics](../2d-physics/2d-physics.html "../2d-physics/2d-physics.html") instead.

To create a connection or constraint between two Physics Core 2D API objects, create a joint that connects the two physics bodies.

For example, create a fixed joint that welds two bodies together, or a distance joint that keeps them a set distance apart. Use joints to simulate real-world mechanical behaviours like a spring or a hinge.

All joints allow you to set the anchor points on the bodies they connect, and limits on the force and torque they apply. For more information, refer to the [`PhysicsJoint`](../../ScriptReference/Unity.U2D.Physics.PhysicsJoint.html "../../ScriptReference/Unity.U2D.Physics.PhysicsJoint.html") API.

Follow these steps:

1. Create two `PhysicsBody` objects. For more information, refer to [Create a physics object](2d-physics-api-physics-object.html "2d-physics-api-physics-object.html").
2. Create a definition object for the type of joint you want. For example, a `PhysicsDistanceJointDefinition` object. Make it a `public` field so it displays its properties in the **Inspector** window.

   For example:

   ```
   public PhysicsDistanceJointDefinition jointDefinition = new PhysicsDistanceJointDefinition
   {
       // Specify the two bodies to connect
       bodyA = body1,
       bodyB = body2,

       // Set the distance
       distance = 2f
   };
   ```

   A new definition has a set of default values. For more information about definitions and changing the default values, refer to [Configure 2D physics properties using a definition](2d-physics-api-definitions.html "2d-physics-api-definitions.html").

   For the full list of joint types, refer to [`PhysicsJoint.JointType`](../../ScriptReference/Unity.U2D.Physics.PhysicsJoint.JointType.html "../../ScriptReference/Unity.U2D.Physics.PhysicsJoint.JointType.html").
3. To create the joint, use the `CreateJoint` method of your world object, and pass in the definition. For example:

   ```
   PhysicsJoint distanceJoint = world.CreateJoint(jointDefinition);
   ```
4. If your script is in a `MonoBehaviour` class attached to a GameObject, adjust the properties in the **Inspector** window.

   To configure the properties in your script instead, set the properties of the definition object before you create the joint. For more information, refer to [Configure 2D physics properties using a definition](2d-physics-api-definitions.html "2d-physics-api-definitions.html").

If you destroy a body, any joints connected to that body are also destroyed. For more information, refer to [Destroy physics objects and manage memory](2d-physics-api-destroy.html "2d-physics-api-destroy.html").

## Example

The following example uses a fixed joint to create a fixed point that a large circle swings from.

```
using UnityEngine;
using Unity.U2D.Physics; 

public class CreateJoint : MonoBehaviour
{
    public PhysicsDistanceJointDefinition jointDefinition = new PhysicsDistanceJointDefinition();

    void Awake()
    {
        PhysicsWorld world = PhysicsWorld.defaultWorld;

        // Create a static fixed body
        PhysicsBodyDefinition bodyDefinition1 = new PhysicsBodyDefinition{
            type = PhysicsBody.BodyType.Static,
            position = new Vector2(-5f, 0f),
        };
        PhysicsBody object1 = world.CreateBody(bodyDefinition1);

        // Create a large circle below the fixed body
        PhysicsBodyDefinition bodyDefinition2 = new PhysicsBodyDefinition{
            type = PhysicsBody.BodyType.Dynamic,
            position = new Vector2(5f, 0f),
        };
        PhysicsBody object2 = world.CreateBody(bodyDefinition2);
        object2.CreateShape(new CircleGeometry { radius = 3f });

        // Add the bodies to the joint definition
        jointDefinition.bodyA = object1;
        jointDefinition.bodyB = object2;
        
        // Add the joint to the world
        world.CreateJoint(jointDefinition);        
    }
}
```

## Additional resources

* [Collisions and interactions in the Physics Core 2D API](2d-physics-api-interactions-landing.html "2d-physics-api-interactions-landing.html")
* [PhysicsCore2D repository](https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master "https://github.com/Unity-Technologies/PhysicsExamples2D/tree/master") on GitHub

Combine Physics Core 2D API shapes

Destroy Physics Core 2D API objects and manage memory

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/landing-working-graphs.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* Working with graphs

Add subgraph support

Add nodes to a graph

# Working with graphs

Add, connect, manage, and organize the nodes in your graphs.

Discover how to use [nodes](node-introduction.html "node-introduction.html"), the fundamental components of a graph, effectively. When graphs have many nodes, they can become complex. Explore how to navigate large graphs and organize them.

This information covers working with graphs in Graph Toolkit only. For information on how to create graphs, refer to [Implement a graph tool](implement-a-graph-tool.html "implement-a-graph-tool.html"). For information about the Graph Toolkit interface, refer to [Graph Toolkit interface](landing-graph-interface.html "landing-graph-interface.html").

| **Topic** | **Description** |
| --- | --- |
| **[Add nodes to a graph](task-add-nodes.html "task-add-nodes.html")** | Add nodes to a graph. |
| **[Connect nodes in your graphs](task-connect-nodes.html "task-connect-nodes.html")** | Connect the nodes in a graph. |
| **[Manage the nodes in your graphs](task-manage-nodes.html "task-manage-nodes.html")** | Use nodes in a graph. |
| **[Organizing graphs](landing-organize-graphs.html "landing-organize-graphs.html")** | Discover techniques to arrange graphs to improve readability and manageability. |
| **[Add comments to graphs](task-add-comments-to-graphs.html "task-add-comments-to-graphs.html")** | Learn how to annotate your graphs with comments for better collaboration and understanding. |

## Additional resources

* [About nodes](node-introduction.html "node-introduction.html")
* [Implementing a graph tool](implementing-a-graph-tool.html "implementing-a-graph-tool.html")
* [Graph Toolkit interface](landing-graph-interface.html "landing-graph-interface.html")

Add subgraph support

Add nodes to a graph

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/task-connect-nodes.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Working with graphs](../gtk/landing-working-graphs.html "../gtk/landing-working-graphs.html")
* Connect nodes in your graphs

Add nodes to a graph

Manage the nodes in your graph

# Connect nodes in your graphs

Connect the nodes in a graph.

A wire is a line that connects the ports of two nodes in a graph.

This page covers how to connect nodes only. For information on how to implement a node, refer to [Implement nodes for your graph tool](implement-nodes.html "implement-nodes.html"). For information on node types and node anatomy, refer to [About nodes](node-introduction.html "node-introduction.html").

## Connect nodes to other nodes on the graph

To connect a node to another node that’s already on the graph, select the port of one node, and drag the mouse to the port of the other node.

A wire connects the nodes.

## Connect nodes to new nodes

To connect a node to a node that doesn’t yet exist on the graph:

1. Identify the node you want to start with.
2. Use one of the following methods to create a new node:

   * Right-click the start node’s port, and select **Add Node from port**
   * Select the port, and drag the mouse to the place on the canvas where you want to create the new node.

   The **Add a graph node** window opens.
3. Select the type of new node you want to connect.

The new node appears on the canvas. It connects to the starting node with a wire.

## Add variable nodes to other nodes on the graph

To add a variable node to an existing node, right-click a node’s port, and select **Create Variable from port**.

This creates a variable in the [Blackboard](blackboard.html "blackboard.html"), which automatically adds a variable node referencing that variable in the graph and connects it to the port of the node.

## Additional resources

* [Implement nodes for your graph tool](implement-nodes.html "implement-nodes.html")
* [About nodes](node-introduction.html "node-introduction.html")
* [Graph Toolkit interface](landing-graph-interface.html "landing-graph-interface.html")

Add nodes to a graph

Manage the nodes in your graph

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/task-manage-nodes.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Working with graphs](../gtk/landing-working-graphs.html "../gtk/landing-working-graphs.html")
* Manage the nodes in your graph

Connect nodes in your graphs

Organizing graphs

# Manage the nodes in your graph

Use nodes in a graph.

Nodes are the fundamental building blocks of a graph. You can select, delete, cut, copy, and paste nodes in the **Graph** window. You can also collapse and expand nodes for better organization, frame a node to center it in the **Graph** window, remove wires between nodes, and disable nodes.

This page covers information about how to manage nodes only. For information on how to create nodes, refer to [Implement nodes for your graph tool](implement-nodes.html "implement-nodes.html"). For information on node types and node anatomy, refer to [About nodes](node-introduction.html "node-introduction.html").

## Select multiple nodes

To select multiple nodes simultaneously, use one of the following methods:

* Click on the canvas, and drag your mouse to form a rectangle. This selects any nodes in the rectangle.
* Hold down **Shift**, and drag your mouse on the canvas to draw a custom selection path. This selects any nodes intersected by this path.

**Tip**: If you drag an element close to the edge of the Graph window, the canvas automatically pans. To zoom in and out, use the mouse scroll wheel.

## Delete a node

To delete a node, right-click the node, and select **Delete**.

To delete multiple nodes at a time, hold down **Alt**+**Shift** (macOS: **Cmd**+**Shift**), and drag to draw a custom selection path. This deletes any nodes intersected by this path.

## Cut, copy, and paste nodes

You can cut, copy, and paste nodes. To do so, right-click on a node, and select the action. Alternatively, use the keyboard shortcut.

## Collapse or expand a node

To collapse or expand a node, use one of the following methods:

* Select the **Collapse Node** button on the node.
* Right-click the node, and select **Toggle Collapse**.

## Center a node

To center the node in the **Graph** window, right-click the node, and select **Frame selection**.

## Disable a node

To disable a node or nodes, right-click the selected nodes, and select **Disable nodes**.

## Disconnect wires

To remove wires from all nodes in a selected area, right-click the selected nodes, and select **Disconnect all wires**.

## Additional resources

* [About nodes](node-introduction.html "node-introduction.html")
* [Implement nodes for your graph tool](implement-nodes.html "implement-nodes.html")
* [Connect nodes in your graphs](task-connect-nodes.html "task-connect-nodes.html")
* [Shortcuts window reference](../shortcuts-view.html "../shortcuts-view.html")

Connect nodes in your graphs

Organizing graphs

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/implement-node-options.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Implementing a Graph Tool](../gtk/implementing-a-graph-tool.html "../gtk/implementing-a-graph-tool.html")
* Implement node options

Implement block nodes for your graph tool

Add subgraph support

# Implement node options

Customize node behavior and structure with configurable options.

Use node options to dynamically customize node behavior and structure without creating multiple node variants. Configure the node option settings to use a single node type in different scenarios. For example, you can use node options to dynamically adjust both the number of ports and their data types. With node options, you can simplify the node hierarchy while maintaining flexibility.

This page covers how to implement node options only. For information on how to implement nodes, refer to [Implement nodes for your graph tool](implement-nodes.html "implement-nodes.html"). For information about node types, refer to [About nodes](node-introduction.html "node-introduction.html").

## Prerequisites

1. [Implement a graph tool](implement-a-graph-tool.html "implement-a-graph-tool.html").
2. [Implement nodes for your graph tool](implement-nodes.html "implement-nodes.html").

## Add a node option to change the number of ports of a node

To create a node with a configurable number of ports:

1. Define a constant name for the port count option.
2. Override `OnDefineOptions` to create the option with a default value.
3. Call `Delayed()` to defer processing until the input is complete.

   ```
   const string k_PortCountName = "PortCount";

   protected override void OnDefineOptions(IOptionDefinitionContext context)
   {
       context.AddOption<int>(k_PortCountName)
           .WithDisplayName("Port Count")
           .WithDefaultValue(2)
           .Delayed();
   }
   ```
4. Implement `OnDefinePorts` to create ports based on the option value as follows:

   ```
   protected override void OnDefinePorts(IPortDefinitionContext context)
   {
       var portCountOption = GetNodeOptionByName(k_PortCountName);
       portCountOption.TryGetValue<int>(out var portCount);
       for (var i = 0; i < portCount; i++)
       {
           context.AddInputPort<Vector2>($"{i}").Build();
       }

       context.AddOutputPort<Vector2>("result").Build();
   }
   ```

The `GetNodeOptionByName` method retrieves the option using its name, and then `TryGetValue` extracts its current value. The node can dynamically adjust its structure based on user configuration.

Open the graph and instantiate the node to check the result.

## Add a node option to change port types of a node

To create a node with switchable port data types:

1. Define an enum for your type options.
2. To create an option that uses this enum as its type, override `OnDefineOptions`.
3. To determine port data types in your `OnDefinePorts` implementation, use the selected enum value.

   **Note**: There’s no need to call `Delayed()` because the port needs to change as soon as the port type option changes.

   ```
   enum PortTypes
   {
       Vec2,
       Vec3
   }

   const string k_PortTypeName = "PortType";

   protected override void OnDefineOptions(IOptionDefinitionContext context)
   {
       context.AddOption<PortTypes>(k_PortTypeName).WithDisplayName("Port Type");
   }

   protected override void OnDefinePorts(IPortDefinitionContext context)
   {
       var portTypeOption = GetNodeOptionByName(k_PortTypeName);
       portTypeOption.TryGetValue<PortTypes>(out var portType);

       if (portType == PortTypes.Vec3)
       {
           context.AddOutputPort<Vector3>("result").Build();
       }
       else
       {
           context.AddOutputPort<Vector2>("result").Build();
       }
   }
   ```
4. Go back to the graph, and use the two new options to change the layout of the node.

## Complete node option example

```
[Serializable]
public class NodeWithOptions : Node
{
    enum PortTypes
    {
        Vec2,
        Vec3
    }

    const string k_PortCountName = "PortCount";
    const string k_PortTypeName = "PortType";

    protected override void OnDefineOptions(IOptionDefinitionContext context)
    {
        context.AddOption<int>(k_PortCountName)
            .WithDisplayName("Port Count")
            .WithDefaultValue(2)
            .Delayed();
        context.AddOption<PortTypes>(k_PortTypeName);
    }

    protected override void OnDefinePorts(IPortDefinitionContext context)
    {
        var portCountOption = GetNodeOptionByName(k_PortCountName);
        portCountOption.TryGetValue<int>(out var portCount);
        for (var i = 0; i < portCount; i++)
        {
            context.AddInputPort<Vector2>($"{i}").Build();
        }

        var portTypeOption = GetNodeOptionByName(k_PortTypeName);
        portTypeOption.TryGetValue<PortTypes>(out var portType);

        if (portType == PortTypes.Vec3)
        {
            context.AddOutputPort<Vector3>("result").Build();
        }
        else
        {
            context.AddOutputPort<Vector2>("result").Build();
        }
    }
}
```

## Additional resources

* [OnDefineOptions API reference](../../ScriptReference/Unity.GraphToolkit.Editor.Node.OnDefineOptions.html "../../ScriptReference/Unity.GraphToolkit.Editor.Node.OnDefineOptions.html")
* [OnDefinePorts API reference](../../ScriptReference/Unity.GraphToolkit.Editor.Node.OnDefinePorts.html "../../ScriptReference/Unity.GraphToolkit.Editor.Node.OnDefinePorts.html")
* [GetNodeOptionByName API reference](../../ScriptReference/Unity.GraphToolkit.Editor.Node.GetNodeOptionByName.html "../../ScriptReference/Unity.GraphToolkit.Editor.Node.GetNodeOptionByName.html")
* [Implement a graph tool](implement-a-graph-tool.html "implement-a-graph-tool.html")
* [Implement nodes for your graph tool](implement-nodes.html "implement-nodes.html")

Implement block nodes for your graph tool

Add subgraph support

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/graph-window.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Graph Toolkit interface](../gtk/landing-graph-interface.html "../gtk/landing-graph-interface.html")
* Graph window reference

Graph Toolkit interface

Blackboard window reference

# Graph window reference

Explore the properties of the Graph window to create graphs.

The Graph window contains the canvas, the Blackboard window, the MiniMap window, the Graph Inspector window, and the Graph Toolkit overlay.

You must create a graph class before the Graph window can appear.

## Graph window properties

The Graph window contains the following properties:

| **UI Element** | **Description** |
| --- | --- |
| **Canvas** | Displays the main area where you create and manipulate nodes and connections. The level of detail displayed on the **Canvas** adjusts depending on the zoom level. |
| **Blackboard** | Displays and manages variables available for use in the graph. For more information, refer to [Blackboard window reference](blackboard.html "blackboard.html"). |
| **MiniMap** | Displays a small overview of the entire graph and provides an alternative way to navigate and visualize the graph’s structure. For more information, refer to [MiniMap window reference](minimap.html "minimap.html"). |
| **Graph Inspector** | Provides detailed information about a selected graph element. For more information, refer to [Graph Inspector window reference](graph-inspector.html "graph-inspector.html"). |
| **Graph Toolkit overlay** | Contains controls to perform common actions. You can use Unity’s [overlay](../overlays.html "../overlays.html") system to extend the toolbar. For more information, refer to [Graph Toolkit overlay reference](gtk-overlay.html "gtk-overlay.html"). |

## Additional resources

* [Blackboard window reference](blackboard.html "blackboard.html")
* [MiniMap window reference](minimap.html "minimap.html")
* [Graph Inspector window reference](graph-inspector.html "graph-inspector.html")
* [Overlays](../overlays.html "../overlays.html")

Graph Toolkit interface

Blackboard window reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/task-add-comments-to-graphs.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Working with graphs](../gtk/landing-working-graphs.html "../gtk/landing-working-graphs.html")
* Add comments to graphs

Organize with nested graphs

Customize your workspace layout

# Add comments to graphs

Annotate graphs with comments for better collaboration and understanding.

While you work, you might want to leave comments to yourself or your collaborators. Add a sticky note to the graph to annotate your thoughts.

## Create a sticky note

To create a sticky note:

1. Right-click on the canvas, and select **Create Sticky Note**.

   The canvas displays a sticky note.
2. Fill in the top text box in the sticky note to name it. To rename it, edit the text box or right-click the sticky note and select **Rename**.
3. Type in the larger text box in the sticky note to leave a comment to yourself or your collaborators.

### Adjust the sticky note for visibility

To make the sticky note easier to read:

* Right-click the sticky note, and select **Frame selection** to center the sticky note in the Graph window.
* Right-click the sticky note, and select **Font size** to increase the size of the text.
* Right-click the sticky note, and select **Color** to change the color of the sticky note.

### Duplicate and delete sticky notes

To duplicate a sticky note, right-click the sticky note, and select **Duplicate**.

To delete a sticky note, right-click the sticky note, and select **Delete**.

## Additional resources

* [Graph Toolkit interface](landing-graph-interface.html "landing-graph-interface.html")
* [Graph window](graph-window.html "graph-window.html")
* [Shortcuts window reference](../shortcuts-view.html "../shortcuts-view.html")

Organize with nested graphs

Customize your workspace layout

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/implement-nodes.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Implementing a Graph Tool](../gtk/implementing-a-graph-tool.html "../gtk/implementing-a-graph-tool.html")
* Implement nodes for your graph tool

About nodes

Implement context nodes for your graph tool

# Implement nodes for your graph tool

Create custom node types with input and output ports.

Nodes are the fundamental building blocks of any graph. Standard nodes can have input and output ports to connect with other nodes.

This page covers how to implement nodes only. For information about node types, refer to [About nodes](node-introduction.html "node-introduction.html"). For information on how to implement node options, refer to [Implement node options](implement-node-options.html "implement-node-options.html").

## Prerequisites

Before you implement nodes, you need to have created a graph class. If you haven’t done this yet, follow the instructions in [Implement a graph tool](implement-a-graph-tool.html "implement-a-graph-tool.html").

## Implement a node

To implement a node, you need to define a class, and define ports.

### Define a class

To define a class:

1. Define a class that inherits from the `Node` base class.
2. To ensure automatic discovery, define the node class in the same assembly as the graph tool. You can also link a node to a graph tool if you decorate the node class with the `UseWithGraph` attribute. The node’s class name serves as the node’s title in the interface.

```
[Serializable]
public class BasicNode : Node
{
}
[Serializable]
public class BasicNodeFinal : Node
{
    protected override void OnDefinePorts(IPortDefinitionContext context)
    {
        context.AddInputPort("Input").Build();
        context.AddInputPort<int>("a").Build();

        context.AddOutputPort("Output").Build();
        context.AddOutputPort<int>("result").Build();
    }
}
```

**Note**: The nodes include a `Serializable` attribute. This attribute enables the tool to write the nodes into the graph asset and deserialize them when you open the graph.

### Define the ports for the node

To configure the data connections for the node, override the `OnDefinePorts` method and use the `AddInputPort` and `AddOutputPort` methods of the `IPortDefinitionContext` interface.

```
protected override void OnDefinePorts(IPortDefinitionContext context)
{
    context.AddInputPort("Input").Build();
    context.AddInputPort<int>("a").Build();

    context.AddOutputPort("Output").Build();
    context.AddOutputPort<int>("result").Build();
}
```

**Note**: Ports support any Unity-compatible type, including your custom types. The omission of a type creates connection-only ports that link nodes but don’t transfer data.

**Tip**: Use optional methods such as `WithDisplayName` or `WithConnectorUI` to customize your port.

```
    context.AddInputPort<int>("a")
        .WithDisplayName("My Int")
        .WithConnectorUI(PortConnectorUI.Arrowhead)
        .Build();
```

### Add vertical ports

By default, input ports appear on the left of the node and output ports appear on the right. To place ports vertically (input ports on the top of the node and output ports on the bottom), call `AsVertical` in the port builder chain before `Build`.

```
[Serializable]
public class NodeWithVerticalPorts : Node
{
    protected override void OnDefinePorts(IPortDefinitionContext context)
    {
        context.AddInputPort("Vertical Input")
            .AsVertical()
            .WithTooltip("Vertical input")
            .Build();

        context.AddOutputPort("Vertical Output")
            .AsVertical()
            .WithTooltip("Vertical output")
            .Build();
    }
}
```

Call `AsVertical` on each port you want to orient vertically. You can mix vertical and horizontal ports on the same node. Vertical ports can connect to horizontal ports of the same type, and vice versa.

**Note**: Vertical ports don’t display their labels on the node. Hovering over a connector displays a tooltip that shows the port name and type. You can use `WithTooltip` to customize the tooltip.

**Note**: Vertical ports aren’t supported on block nodes. Block node ports always display horizontally. For more information on block nodes, refer to [Implement block nodes for your graph tool](implement-block-nodes.html "implement-block-nodes.html").

### Node complete example

```
[Serializable]
public class BasicNodeFinal : Node
{
    protected override void OnDefinePorts(IPortDefinitionContext context)
    {
        context.AddInputPort("Input").Build();
        context.AddInputPort<int>("a").Build();

        context.AddOutputPort("Output").Build();
        context.AddOutputPort<int>("result").Build();
    }
}
```

## Additional resources

* [Node class API reference](../../ScriptReference/Unity.GraphToolkit.Editor.Node.html "../../ScriptReference/Unity.GraphToolkit.Editor.Node.html")
* [OnDefinePorts API reference](../../ScriptReference/Unity.GraphToolkit.Editor.Node.OnDefinePorts.html "../../ScriptReference/Unity.GraphToolkit.Editor.Node.OnDefinePorts.html")
* [IPortDefinitionContext API reference](../../ScriptReference/Unity.GraphToolkit.Editor.IPortDefinitionContext.html "../../ScriptReference/Unity.GraphToolkit.Editor.IPortDefinitionContext.html")
* [AsVertical API reference](../../ScriptReference/Unity.GraphToolkit.Editor.IPortBuilder_1.AsVertical.html "../../ScriptReference/Unity.GraphToolkit.Editor.IPortBuilder_1.AsVertical.html")
* [WithTooltip API reference](../../ScriptReference/Unity.GraphToolkit.Editor.IPortBuilder_1.WithTooltip.html "../../ScriptReference/Unity.GraphToolkit.Editor.IPortBuilder_1.WithTooltip.html")
* [About nodes](node-introduction.html "node-introduction.html")
* [Implement node options](implement-node-options.html "implement-node-options.html")
* [Implement block nodes for your graph tool](implement-block-nodes.html "implement-block-nodes.html")
* [Implement context nodes for your graph tool](implement-context-nodes.html "implement-context-nodes.html")
* [Implement a graph tool](implement-a-graph-tool.html "implement-a-graph-tool.html")

About nodes

Implement context nodes for your graph tool

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/minimap.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Graph Toolkit interface](../gtk/landing-graph-interface.html "../gtk/landing-graph-interface.html")
* MiniMap window reference

Graph Inspector window reference

Graph Toolkit overlay reference

# MiniMap window reference

Explore the properties of the MiniMap window to view where the parts of the graph fit into the overall graph structure.

This window displays a small overview of the entire graph and provides an alternative way to navigate and visualize the graph’s structure.

To view the MiniMap window, you must first create a graph.

Select any part of the graph, such as a node, placemat, or sticky note, in the MiniMap window to center that item in the Graph window.

## MiniMap window settings

The MiniMap window contains the following properties:

| **Settings** | **Description** |
| --- | --- |
| **Map** | Displays a miniature version of the entire graph. |
| **Zoom** | Displays the zoom level of the Graph window. |

## Additional resources

* [Graph window reference](graph-window.html "graph-window.html")
* [Extending the Editor with Graph Toolkit](gtk-index.html "gtk-index.html")

Graph Inspector window reference

Graph Toolkit overlay reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/graph-inspector.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Graph Toolkit interface](../gtk/landing-graph-interface.html "../gtk/landing-graph-interface.html")
* Graph Inspector window reference

Blackboard window reference

MiniMap window reference

# Graph Inspector window reference

View and modify the settings of the selected graph elements.

The Graph Inspector window displays detailed information about a selected graph element. If you don’t select anything, the Graph Inspector shows the properties of the graph itself. If you select a graph element that doesn’t have properties, such as a wire, sticky note, or simple node, the Graph Inspector displays the title of the graph element and its icon. If you select a graph element with properties, such as a placemat, node with ports, or subgraph, the Graph Inspector displays those properties.

To open the Graph Inspector window, enable the **Graph Inspector** icon in the overlay.

For information about other Graph Toolkit UI windows, refer to [Graph window reference](graph-window.html "graph-window.html").

## Graph Inspector window properties

The Graph Inspector window contains the following properties.

### Placemat

When you select a placemat, the Graph Inspector window contains the following settings:

| **Property** | **Description** |
| --- | --- |
| **Title Font Size** | Defines the size of the text in the placemat title. |
| **Title Alignment** | Sets the alignment of the text in the placemat title. The following options are available:  * **Left aligned**. * **Center aligned**. * **Right aligned**. |
| **Color** | Opens the Color window, through which you can change the color of the placemat. |
| **Comment** | Provides a text box for comments. |

### Node with ports

When you select a node with ports, the Graph Inspector window contains the following settings:

| **Property** | **Description** |
| --- | --- |
| **Node Properties** | Defines the node properties, such as the input value. |

### Local subgraph

When you select a local subgraph, the Graph Inspector window contains the following settings:

| **Property** | **Description** |
| --- | --- |
| **Title** | Defines the title of the local subgraph. |
| **Subtitle** | Defines the subtitle of the local subgraph. |

### Asset subgraph

When you select an asset subgraph, the Graph Inspector window contains the following settings:

| **Property** | **Description** |
| --- | --- |
| **Title** | Defines the title of the asset subgraph. |
| **Subtitle** | Defines the subtitle of the asset subgraph. |
| **Asset** | Displays the asset the subgraph references. The following options are available:  * **Open**: Opens the subgraph in the Inspector window. * **Select**: Highlights the subgraph on the graph. |

## Additional resources

* [Graph window reference](graph-window.html "graph-window.html")
* [Types of nested graphs](concept-subgraph-types.html "concept-subgraph-types.html")

Blackboard window reference

MiniMap window reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/node-introduction.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Implementing a Graph Tool](../gtk/implementing-a-graph-tool.html "../gtk/implementing-a-graph-tool.html")
* About nodes

Implement a graph tool

Implement nodes for your graph tool

# About nodes

Understand nodes, their parts, and the different types of nodes.

In the context of graph tools, a node is a modular building block that represents a specific operation, piece of data, or functionality. Nodes are visual elements that can connect together to define workflows, processes, or systems. Each node typically has inputs, outputs, and internal logic that determines how it processes information.

Think of nodes as puzzle pieces or blocks in a construction set. Each node serves a specific purpose. When combined with other nodes, they create a larger, more complex structure or tool.

This page covers node concepts only. For information on how to implement a node, refer to [Implement nodes for your graph tool](implement-nodes.html "implement-nodes.html"). For information about node options, refer to [Implement node options](implement-node-options.html "implement-node-options.html").

## Types of nodes

Graph Toolkit supports three primary types of nodes, each of which serves a distinct purpose within a graph tool:

* [Standard node](#anatomy-of-a-node "#anatomy-of-a-node"): The basic building block of a graph. It represents an individual operation or data point. Standard nodes can have input and output ports to connect with other nodes.
* [Context node](#context-nodes "#context-nodes"): A node that provides context-specific information or functionality. It’s a specialized container that contains only block nodes that define its operation.
* [Block node](#block-nodes "#block-nodes"): A node that exists only in a context node and performs a single operation.

Secondary nodes provide a function that can’t be modified. These nodes include:

* Variable nodes: Represent a variable in the blackboard.
* Constant nodes: Represent a local constant value.
* Portal nodes: Pass a wire connection from one node to another.

**Note**: Graph Toolkit doesn’t have any predefined nodes. Instead, there’s an API, so you can build your own nodes with their own logic to meet the needs of your application.

## Anatomy of a node

In the user interface, a node has these parts:

* Header: The icon, the title, and the **Collapse Node** button. The **Collapse Node** button only appears when you position the mouse over the node.
* (Optional) Options panel: General settings that affect the entire node.
* (Optional) Input/output ports: Connection points for the node. Ports are horizontal(left/right) by default, but you can set them to be vertical(top/bottom).

## Context nodes

Context nodes act as specialized containers that dynamically organize related functional components known as block nodes. You can add, remove, and reorder these blocks within a cohesive structure. With context nodes, you can configure settings that apply to all contained blocks and control which blocks each context node can accept.

Put block nodes in a context node when:

* Multiple operations logically belong together.
* Operations need to follow a specific execution order.
* Multiple operations require the same parameters.
* You need to restrict operations users can perform in a section.
* Complex logic must be broken down into manageable segments.

### Context node structure

In the user interface, a context node has these parts:

* Header: Title and icon of the context node.
* Blocks container: Houses block nodes and the **Add a Block** button.
* (Optional) Options panel: General settings that affect the entire context.
* (Optional) Input/output ports: Connection points for the context node.

## Block nodes

Block nodes are nodes that exist exclusively within context nodes. They’re responsible for performing a single operation or behavior. Unlike standard nodes, a block node can only exist within a context node, and you can’t add it to the graph directly.

Each block type works with specific context node types and can take inputs, produce outputs, and participate in the execution flow defined by its parent context.

**Note**: Graph Toolkit doesn’t enforce a specific execution order. Instead, it displays visual indicators, known as etches, between blocks.

You can drag a block node to rearrange it within the context node or move it to another compatible context node. You can’t add an incompatible block node to a context node. If you try to drag an incompatible block to a context node, the context node displays a red outline, and the incompatible block returns to its original position.

### Block node structure

In the user interface, a block node has these parts:

* Header: Block title.
* Etch: Visual indicator between blocks.
* (Optional) Options panel: Block-specific settings.
* (Optional) Input/output ports: Connection points specific to this block.

## Additional resources

* [Implement nodes for your graph tool](implement-nodes.html "implement-nodes.html")
* [Implement node options](implement-node-options.html "implement-node-options.html")

Implement a graph tool

Implement nodes for your graph tool

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/implement-context-nodes.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Implementing a Graph Tool](../gtk/implementing-a-graph-tool.html "../gtk/implementing-a-graph-tool.html")
* Implement context nodes for your graph tool

Implement nodes for your graph tool

Implement block nodes for your graph tool

# Implement context nodes for your graph tool

Create context nodes to organize and contain block nodes in the graph tool.

Context nodes provide context-specific information or functionality and contain only block nodes. A context node inherits all features available in its parent `Node` class.

This page covers how to implement context nodes only. For information on how to implement block nodes, refer to [Implement block nodes for your graph tool](implement-block-nodes.html "implement-block-nodes.html"). For information about node types, refer to [About nodes](node-introduction.html "node-introduction.html").

## Prerequisites

Before you can implement context nodes, you need to create a graph class. If you haven’t done this yet, follow the instructions in [Implement a graph tool](implement-a-graph-tool.html "implement-a-graph-tool.html").

## Implement a context node

To implement a context node, define a class that inherits from the `ContextNode` base class:

```
[Serializable]
public class MyContextNode : ContextNode
{
}
```

Review [Implement a node](implement-nodes.html "implement-nodes.html") to learn how to customize the node with node options, ports, and orientation settings.

## Additional resources

* [ContextNode API reference](../../ScriptReference/Unity.GraphToolkit.Editor.ContextNode.html "../../ScriptReference/Unity.GraphToolkit.Editor.ContextNode.html")
* [Implement a graph tool](implement-a-graph-tool.html "implement-a-graph-tool.html")
* [About nodes](node-introduction.html "node-introduction.html")
* [Implement a node](implement-nodes.html "implement-nodes.html")
* [Implement block nodes for your graph tool](implement-block-nodes.html "implement-block-nodes.html")

Implement nodes for your graph tool

Implement block nodes for your graph tool

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/implement-block-nodes.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Implementing a Graph Tool](../gtk/implementing-a-graph-tool.html "../gtk/implementing-a-graph-tool.html")
* Implement block nodes for your graph tool

Implement context nodes for your graph tool

Implement node options

# Implement block nodes for your graph tool

Create block nodes to define the functionality of the context nodes of your graph tool in Unity.

Block nodes are nodes that perform a single operation or behavior. Block nodes inherit all features available in their parent `Node` class.

**Note**: Block node ports are always horizontal and, as such, the `AsVertical` method has no effect.

This page covers how to implement block nodes only. For information on how to implement context nodes, refer to [Implement context nodes for your graph tool](implement-context-nodes.html "implement-context-nodes.html"). For information about node types, refer to [About nodes](node-introduction.html "node-introduction.html").

## Prerequisites

1. [Implement a graph tool](implement-a-graph-tool.html "implement-a-graph-tool.html")
2. [Implement a context node](implement-context-nodes.html "implement-context-nodes.html").

## Implement a block node

To implement a block node, define a class to associate the block node with a context node.

1. Define a class that inherits from the `BlockNode` base class.
2. Add the `UseWithContext` attribute, and provide it with the type of the `ContextNode` to associate the block node with.

The resulting code looks like:

```
[UseWithContext(typeof(MyContextNode))]
[Serializable]
public class MyBlockNode : BlockNode
{
}


[UseWithContext(typeof(MyContextNode), typeof(MyOtherContextNode))]
[Serializable]
public class MyBlockNodeWithMultipleContexts : BlockNode
{
}
```

To associate a block node with several context nodes, list them separated with a comma in your `UseWithContext` attribute:

```
[UseWithContext(typeof(MyContextNode), typeof(MyOtherContextNode))]
[Serializable]
public class MyBlockNodeWithMultipleContexts : BlockNode
{
}
```

Review [Implement node options](implement-node-options.html "implement-node-options.html") to learn how to customize your node with node options, ports, and orientation settings.

## Additional resources

* [ContextNode API reference](../../ScriptReference/Unity.GraphToolkit.Editor.ContextNode.html "../../ScriptReference/Unity.GraphToolkit.Editor.ContextNode.html")
* [BlockNode API reference](../../ScriptReference/Unity.GraphToolkit.Editor.BlockNode.html "../../ScriptReference/Unity.GraphToolkit.Editor.BlockNode.html")
* [UseWithContextAttribute API reference](../../ScriptReference/Unity.GraphToolkit.Editor.UseWithContextAttribute.html "../../ScriptReference/Unity.GraphToolkit.Editor.UseWithContextAttribute.html")
* [Implement a graph tool](implement-a-graph-tool.html "implement-a-graph-tool.html")
* [About nodes](node-introduction.html "node-introduction.html")
* [Implement context nodes for your graph tool](implement-context-nodes.html "implement-context-nodes.html")
* [Implement node options](implement-node-options.html "implement-node-options.html")

Implement context nodes for your graph tool

Implement node options

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/graph-item-library.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Graph Toolkit interface](../gtk/landing-graph-interface.html "../gtk/landing-graph-interface.html")
* Add a graph node window reference

Graph Toolkit overlay reference

Implementing a Graph Tool

# Add a graph node window reference

Explore the properties and settings of the window to search for, browse, and insert nodes directly into the canvas.

To open the window, right-click on the canvas and select **Add Node**. Alternatively, press **Spacebar**.

To mark a node as a favorite, hover over it and select the star icon. This adds the node to the Favorites list at the top of the graph node library.

## Add a graph node window properties

The **Add a graph node** window contains the following properties:

| **Property** | **Description** |
| --- | --- |
| **Search bar** | Displays a search bar with smart, or fuzzy, search capabilities. |
| **Graph node library** | Displays a catalog of nodes that you can add to the graph based on context. |
| **Info Panel** | Displays a preview of the node. |

## Additional resources

* [Graph window reference](graph-window.html "graph-window.html")
* [Graph Inspector reference](graph-inspector.html "graph-inspector.html")

Graph Toolkit overlay reference

Implementing a Graph Tool

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/blackboard.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Graph Toolkit interface](../gtk/landing-graph-interface.html "../gtk/landing-graph-interface.html")
* Blackboard window reference

Graph window reference

Graph Inspector window reference

# Blackboard window reference

Explore the Blackboard window settings to create and organize variables.

The Blackboard displays and manages variables available for use in the graph. You can create, edit, delete, and organize variables, as well as drag them to reorder them. You can also drag variables directly onto the graph canvas for immediate use.

## Blackboard window properties

The Blackboard window contains the following properties:

| **Property** | **Description** |
| --- | --- |
| **+** | Creates a new variable of the same data type as the variable you last created. |
| **Type selector dropdown** | Opens a window, so you can create a new variable with a new data type. |

### Variable settings

Each variable in the Blackboard window contains the following settings:

| **Setting** | **Description** |
| --- | --- |
| **Data Type** | Displays the data type of the variable. Select **Change** to convert the variable to a different data type. |

Other variable settings depend on the type of variable.

## Additional resources

* [Graph window reference](graph-window.html "graph-window.html")
* [Graph Inspector reference](graph-inspector.html "graph-inspector.html")

Graph window reference

Graph Inspector window reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/add-subgraph-support.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Implementing a Graph Tool](../gtk/implementing-a-graph-tool.html "../gtk/implementing-a-graph-tool.html")
* Add subgraph support

Implement node options

Working with graphs

# Add subgraph support

Enable support for subgraphs in your graph tool.

Subgraph support lets you use one graph as a node in another graph. Use it to create reusable components and break complex graphs into smaller, more manageable pieces.

## Prerequisites

Before you can add support for subgraphs, you need to create a graph class. If you haven’t done this yet, follow the instructions in [Implement a graph tool](implement-a-graph-tool.html "implement-a-graph-tool.html").

## Add the option to support subgraphs

To add support for subgraphs, add `GraphOptions.SupportsSubgraphs` in the `Graph` attribute’s options parameter as follows:

```
   [Graph(AssetExtension, GraphOptions.SupportsSubgraphs)]
```

## Additional resources

* [Implement a graph tool](implement-a-graph-tool.html "implement-a-graph-tool.html")
* [GraphOptions API reference](../../ScriptReference/Unity.GraphToolkit.Editor.GraphOptions.html "../../ScriptReference/Unity.GraphToolkit.Editor.GraphOptions.html")

Implement node options

Working with graphs

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/task-add-nodes.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Working with graphs](../gtk/landing-working-graphs.html "../gtk/landing-working-graphs.html")
* Add nodes to a graph

Working with graphs

Connect nodes in your graphs

# Add nodes to a graph

Add standard, context, and block nodes to a graph and connect them.

Nodes are the fundamental building blocks of any graph. To build your graph you need to add nodes to it and connect them. There are three types of nodes you can add to a graph: standard nodes, context nodes, and block nodes.

## Prerequisites

Before you can add nodes to a graph, you need to create a graph instance. If you haven’t done this yet, follow the instructions in [Implement a graph tool](implement-a-graph-tool.html "implement-a-graph-tool.html").

## Add a standard node to your graph

To add a standard node to your graph:

1. Right-click the graph canvas, and select **Add Node** to open the **Add a graph node** window.
2. Navigate to the **Nodes** category.
3. Double-click the node name to add it to the graph.

The node appears on the canvas. You can move it, remove it, or connect it to other nodes.

## Add a context node to your graph

To add a context node to the graph:

1. Right-click the graph canvas, and select **Add Node** to open the **Add a graph node** window.
2. Navigate to the **Contexts** category.
3. Double-click to add the context node to the graph.

The context node appears on the canvas. It behaves like any other node in the graph. You can move it, remove it, or connect it to other nodes.

A new context node doesn’t contain any blocks. Follow the steps in [Add a block node to a context node](#add-a-block-node-to-a-context-node "#add-a-block-node-to-a-context-node") to add blocks to the context node.

## Add a block node to a context node

To add a block node inside a context node:

1. In the context node, select **Add a Block**. The **Add a graph node** window opens and displays all the blocks you can add to the context node.
2. Double-click the block node you want to add to the context node.

After you add a block node, you can remove or connect a block node the same way as other nodes.

## Additional resources

* [Implement a graph tool](implement-a-graph-tool.html "implement-a-graph-tool.html")
* [About nodes](node-introduction.html "node-introduction.html")
* [Connect nodes in your graphs](task-connect-nodes.html "task-connect-nodes.html")

Working with graphs

Connect nodes in your graphs

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/landing-organize-graphs.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Working with graphs](../gtk/landing-working-graphs.html "../gtk/landing-working-graphs.html")
* Organizing graphs

Manage the nodes in your graph

Arrange graph elements

# Organizing graphs

Discover techniques to arrange graphs to improve readability and manageability.

When graphs have many components, they can become large and disorganized. To simplify complex graphs, align and group graph elements, replace wires, and nest content.

This section covers how to organize graphs only. For information on how to create graphs, refer to [Implementing a Graph Tool](implementing-a-graph-tool.html "implementing-a-graph-tool.html").

| **Topic** | **Description** |
| --- | --- |
| **[Arrange graph elements](task-align.html "task-align.html")** | Arrange graph elements in the canvas. |
| **[Group graph elements](task-placemat.html "task-placemat.html")** | Visually group graph elements with placemats. |
| **[Replace wires with portals](task-portal.html "task-portal.html")** | Remove wires to simplify complex graphs. |
| **[Types of nested graphs](concept-subgraph-types.html "concept-subgraph-types.html")** | Compare the two types of nested graphs, or subgraphs, in Graph Toolkit. |
| **[Organize with nested graphs](task-subgraphs.html "task-subgraphs.html")** | Organize complex graphs with nested graphs, or subgraphs. |

## Additional resources

* [Implementing a Graph Tool](implementing-a-graph-tool.html "implementing-a-graph-tool.html")

Manage the nodes in your graph

Arrange graph elements

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/task-subgraphs.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Working with graphs](../gtk/landing-working-graphs.html "../gtk/landing-working-graphs.html")
* [Organizing graphs](../gtk/landing-organize-graphs.html "../gtk/landing-organize-graphs.html")
* Organize with nested graphs

Types of nested graphs

Add comments to graphs

# Organize with nested graphs

Organize complex graphs with nested graphs, or subgraphs.

Large, complex graphs can be difficult to understand. To simplify a graph, you can collapse part of it into levels of nested graphs, called subgraphs. This makes the overall graph easier to read. You can also focus on the content within the subgraphs with less visual distraction.

This information covers nested graphs only. For information on other ways to organize graphs, refer to [Organize graphs](landing-organize-graphs.html "landing-organize-graphs.html").

## Prerequisites

Your graph needs to have support for subgraphs enabled, before you can use subgraphs.

## Use subgraphs

Create subgraphs to simplify the graph. Expand subgraphs to undo the nesting and return the content to a higher level of the graph.

### Create a subgraph

To create a local subgraph, use one of the following methods:

* Right-click on the canvas, then select **Create Empty Local Subgraph**.
* Right-click a placemat’s heading/title, and select **Convert to Local Subgraph**.
* Right-click a node or nodes, then select **Create Local Subgraph from Selection**.

To add another local subgraph if one exists in the graph:

1. Right-click on the canvas, then select **Add Node**. The **Add a graph node** window appears.
2. Double-click on the local subgraph.

To create an asset subgraph, you must already have a graph asset with a valid subgraph type. To create the asset subgraph, use one of the following methods:

* Drag a graph asset from the **Project** window into the **Graph** window.
* Create the asset subgraph from the **Add a graph node** window:

  1. Right-click on the canvas, then select **Add Node**. The **Add a graph node** window appears.
  2. Double-click on the asset subgraph.

A subgraph node appears. It has a different shape from other nodes. A subgraph node has a tab on top.

### Open and close a subgraph

To view a subgraph in detail and interact with its contents, open the subgraph. You can open the subgraph through one of these methods:

* Right-click the subgraph node, then select **Open Local Subgraph**.
* Double-click the subgraph node.
* Select the **Enter Subgraph** icon on the subgraph node.

After you open the subgraph, the canvas and the MiniMap window show only the contents of the subgraph.

To close the subgraph and return to a higher level of the graph, use the breadcrumbs at the top of the Graph view to select the graph or subgraph you want to view.

After you close the subgraph, the canvas and the MiniMap window show the level of the graph that you selected.

### Extract a subgraph

To return the contents of a subgraph to a higher level of the graph:

1. Navigate to the level of the graph with the subgraph node.
2. Extract the contents of the subgraph through one of the following steps:

   * Right-click the subgraph node, then select **Extract Contents to Placemat**.
   * Select the subgraph node, then press **Shift**+**Ctrl**+**U** on the keyboard.

After you extract the subgraph, its contents appear on a placemat. The name of the subgraph becomes the placemat title. If you extract a subgraph that had subgraphs nested inside it, the nested subgraphs will appear as subgraph nodes on the placemat.

### Convert a subgraph

You can convert a local subgraph to an asset subgraph, or convert asset subgraph references to local subgraphs.

To convert a local subgraph to an asset subgraph:

1. Navigate to the level of the graph with the local subgraph node.
2. Right-click the local subgraph node, then select **Convert to Asset Subgraph**. The file explorer appears.
3. Specify the graph asset you want to use for the subgraph, then select **Save**. The local subgraph node becomes an asset subgraph node. The asset subgraph node references the graph asset you specified.

To convert asset subgraph references to local subgraphs:

1. Navigate to the level of the graph with the asset subgraph node.
2. Right-click the asset subgraph node, then select **Unpack to Local Subgraph**.
   The asset subgraph node becomes a local subgraph node. The local subgraph node contains a copy of the content that was in the asset subgraph.

### Delete the subgraph

To delete the subgraph and its contents:

1. Navigate to the level of the graph with the subgraph node.
2. Delete the node through one of the following methods:
   * Right-click the subgraph node, then select **Delete**.
   * Select the subgraph node, then press **Del** on the keyboard.

After you delete the subgraph, the subgraph node and its contents disappear from the graph.

## Additional resources

* [Organize graphs](landing-organize-graphs.html "landing-organize-graphs.html")

Types of nested graphs

Add comments to graphs

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/task-placemat.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Working with graphs](../gtk/landing-working-graphs.html "../gtk/landing-working-graphs.html")
* [Organizing graphs](../gtk/landing-organize-graphs.html "../gtk/landing-organize-graphs.html")
* Group graph elements

Arrange graph elements

Replace wires with portals

# Group graph elements

Visually group graph elements with placemats.

A placemat is a visual background element that you can use to organize graph elements, such as nodes or sticky notes, in a graph. You can use it to show related elements, provide context, or improve the visual layout of the graph.

**Note**: A placemat is a visual border behind the graph elements. It doesn’t have ownership of the graph elements within it and doesn’t apply changes to those elements.

This page covers how to use placemats to visually group graph elements only. For information on placemat details in the Graph Inspector window, refer to [Graph Inspector window reference](graph-inspector.html#placemat "graph-inspector.html#placemat").

## Create an empty placemat

To create an empty placemat, right-click on the canvas, and select **Create Placemat**.

The canvas displays an empty placemat.

## Create a placemat from existing elements

To create a placemat from graph elements already in the graph:

1. [Select the elements](task-manage-nodes.html#select-multiple-nodes "task-manage-nodes.html#select-multiple-nodes").
2. Right-click, and select **Create Placemat from Selection**.

The canvas displays a new placemat behind the selected elements.

## Rename, delete, and duplicate placemats

To rename a placemat, use one of the following methods:

* Right-click the placemat title, and select **Rename**.
* Double-click the placemat title.
* Select the title in the [**Graph Inspector** window](graph-inspector.html#placemat "graph-inspector.html#placemat").

To delete a placemat, right-click the placemat title, and select **Delete**.

The placemat disappears, but its contents remain on the canvas.

To duplicate a placemat, right-click the placemat title, and select **Duplicate**.

The canvas displays a duplicate placemat titled **Copy of [Placemat title]**. The new placemat contains a copy of each of the elements in the original placemat. However, the duplication doesn’t include connections to nodes outside the placemat. For example, if a node in the original placemat connected to a node outside the placemat, the duplicated placemat doesn’t contain the outside node or the wire that connects it.

## Customize placemats

To customize a placemat, open the [**Graph Inspector** window](graph-inspector.html#placemat "graph-inspector.html#placemat"). There, you can adjust the placemat’s title font size, title alignment, and color. You can also leave comments to yourself or your collaborators in a text box.

## Reorder overlapping placemats

To reorder overlapping placemats, right-click the placemat title, and select one of the following options:

* **Bring to Front**.
* **Bring Forward**.
* **Send Backward**.
* **Send to Back**.

This moves the placemat forward or backward in the Z-direction.

## Resize placemats

To resize a placemat to fit the elements within it, right-click the placemat title, and select **Smart Resize**.

## Additional resources

* [Graph Inspector window reference](graph-inspector.html#placemat "graph-inspector.html#placemat")
* [Manage the nodes in your graph](task-manage-nodes.html "task-manage-nodes.html")
* [Shortcuts window reference](../shortcuts-view.html "../shortcuts-view.html")

Arrange graph elements

Replace wires with portals

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/implement-a-graph-tool.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Implementing a Graph Tool](../gtk/implementing-a-graph-tool.html "../gtk/implementing-a-graph-tool.html")
* Implement a graph tool

Implementing a Graph Tool

About nodes

# Implement a graph tool

Create and implement a graph tool to visualize and manage complex data structures in Unity.

## Prerequisites

None.

## Define a custom Graph class

The foundation of any Graph Toolkit tool is a custom `Graph` class. To create one, do the following:

1. Create a new C# script file in the `Assets\Editor` folder of your Unity project.
2. Import the necessary namespaces:

   ```
   using System;
   using UnityEditor;
   using UnityEngine;
   using Unity.GraphToolkit.Editor;
   ```
3. Define a class that inherits from `Graph`.
4. Define an `AssetExtension` string constant to specify your graph’s file extension.
5. Apply the `[Graph]` attribute, and pass your extension as a parameter.
6. Mark your class with `[Serializable]` to ensure proper data persistence as you extend your graph tool.
7. Add a new `CreateAssetFile` function that calls the `PromptInProjectBrowserToCreateNewAsset` method, and decorate this function with a `MenuItem` attribute.

   ```
   [Graph(AssetExtension)]
   [Serializable]
   class MySimpleGraph : Graph
   {
       public const string AssetExtension = "simpleg";

       [MenuItem("Assets/Create/Graph Toolkit Samples/Simple Graph", false)]
       static void CreateAssetFile()
       {
           GraphDatabase.PromptInProjectBrowserToCreateNewAsset<MySimpleGraph>();
       }
   }
   ```

   This basic implementation creates the core structure for your graph tool. The `AssetExtension` constant defines the file extension Unity uses to save your graph assets.
8. Create a new graph asset directly from the Unity Editor’s menu. For example, navigate to **Assets** > **Create** > **Graph Toolkit Samples** > **Simple Graph**. The new asset appears in the **Assets** section of the **Project** window with its name ready for you to enter.
9. Name the asset.
10. Double-click the graph asset file. The **Graph** window opens with an empty canvas.

## Additional resources

* [Graph class API reference](../../ScriptReference/Unity.GraphToolkit.Editor.Graph.html "../../ScriptReference/Unity.GraphToolkit.Editor.Graph.html")
* [Graph attribute API reference](../../ScriptReference/Unity.GraphToolkit.Editor.GraphAttribute.html "../../ScriptReference/Unity.GraphToolkit.Editor.GraphAttribute.html")
* [PromptInProjectBrowserToCreateNewAsset method API reference](../../ScriptReference/Unity.GraphToolkit.Editor.GraphDatabase.PromptInProjectBrowserToCreateNewAsset.html "../../ScriptReference/Unity.GraphToolkit.Editor.GraphDatabase.PromptInProjectBrowserToCreateNewAsset.html")
* [MenuItem attribute API reference](../../ScriptReference/MenuItem.html "../../ScriptReference/MenuItem.html")
* [Graph window reference](graph-window.html "graph-window.html")

Implementing a Graph Tool

About nodes

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/gtk-index.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* Extending the Editor with Graph Toolkit

Extending the Unity Editor

Graph Toolkit interface

# Extending the Editor with Graph Toolkit

Use Graph Toolkit to create node-based graph tools within the Unity Editor.

Graph Toolkit is a front-end framework to build custom graph tools with ready-made UI components and interaction patterns. Graph Toolkit includes extensibility features that you can use to customize implementations to meet your specific requirements. Graph Toolkit is best suited for developers who need to create specialized, graph-based tools that help designers, artists, and other team members to work independently without frequent programmer intervention. Although Graph Toolkit supports compilation to runtime models, it doesn’t include runtime execution backends.

| **Topic** | **Description** |
| --- | --- |
| **[Graph Toolkit interface](landing-graph-interface.html "landing-graph-interface.html")** | Explore the user interface of Graph Toolkit. |
| **[Implementing a graph tool](implementing-a-graph-tool.html "implementing-a-graph-tool.html")** | Explore how to create and implement a graph tool within your Unity projects. |
| **[Working with graphs](landing-working-graphs.html "landing-working-graphs.html")** | Learn how to use the Graph window. |

## Additional resources

* [UI Toolkit](../UIElements.html "../UIElements.html")
* [About nodes](node-introduction.html "node-introduction.html")

Extending the Unity Editor

Graph Toolkit interface

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/task-portal.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Working with graphs](../gtk/landing-working-graphs.html "../gtk/landing-working-graphs.html")
* [Organizing graphs](../gtk/landing-organize-graphs.html "../gtk/landing-organize-graphs.html")
* Replace wires with portals

Group graph elements

Types of nested graphs

# Replace wires with portals

Remove wires to simplify complex graphs.

Portals are connection points that work in pairs and replace visible [wires](task-connect-nodes.html "task-connect-nodes.html") with wireless pathways to reduce visual clutter. They respect the same constraints as the wires they replace.

This page covers how to replace wires with portals only. For information on how to create wires, refer to [Connect nodes in your graph](task-connect-nodes.html "task-connect-nodes.html").

## Add portals in place of wires

To replace wires with portals, right-click on the wire, and select **Convert to Portals**.

The canvas no longer displays the wire. The canvas now displays two portals, one at each node where the wire used to connect. The portals are linked. If you rename one, the name of the other portal also changes.

To change a pair of portals back to a wire, right-click on one of the portals, and select **Revert to Wire**.

## Additional resources

* [Connect nodes in your graph](task-connect-nodes.html "task-connect-nodes.html")
* [Shortcuts window reference](../shortcuts-view.html "../shortcuts-view.html")

Group graph elements

Types of nested graphs

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/concept-subgraph-types.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Working with graphs](../gtk/landing-working-graphs.html "../gtk/landing-working-graphs.html")
* [Organizing graphs](../gtk/landing-organize-graphs.html "../gtk/landing-organize-graphs.html")
* Types of nested graphs

Replace wires with portals

Organize with nested graphs

# Types of nested graphs

Compare the two types of nested graphs, or subgraphs, in Graph Toolkit.

You can use subgraphs to organize and simplify a graph. Two types of subgraphs exist in Graph Toolkit: local subgraphs and asset subgraphs. Learn about the differences and use cases of each.

This information covers the types of subgraphs only. For information on how to create a subgraph, refer to [Organize with nested graphs](task-subgraphs.html "task-subgraphs.html").

## Local subgraphs

A local subgraph is a subgraph that exists within another graph, and it is saved to the same graph asset that contains it. Each local subgraph is unique. Changes to one local subgraph don’t affect other local subgraphs. Even if you duplicate a local subgraph node, the duplicate node has a reference to an entirely new local subgraph. Changes to the first subgraph don’t affect the duplicate subgraph.

The recommended use cases for a local subgraph is to use it as a first step to organize a graph or when you need a subgraph but don’t need to reuse its contents.

**Note**: You can convert a local subgraph to an asset subgraph. For example, if you start with a local subgraph and later decide that you want to reuse it, you can convert it to an asset subgraph. For details on how to convert a local subgraph to an asset subgraph, refer to [Organize with nested graphs](task-subgraphs.html "task-subgraphs.html").

## Asset subgraphs

An asset subgraph is a subgraph that exists as a standalone asset file. Each asset subgraph is reusable across multiple graphs. If you duplicate an asset subgraph node, the duplicate node has a reference to that same asset subgraph. A change made to the asset subgraph propagates to all subgraph nodes that reference it.

The benefit of an asset subgraph is its reuse capability. The recommended use case for an asset subgraph is in a scenario where you need to reuse a subgraph in the same graph or across multiple graphs.

**Note**: You can convert an asset subgraph to a local subgraph. For example, if you start with an asset subgraph and later decide that you don’t need to reuse it, you can convert it to a local subgraph. For details on how to convert an asset subgraph to a local subgraph, refer to [Organize with nested graphs](task-subgraphs.html "task-subgraphs.html").

## Additional resources

* [Organize with nested graphs](task-subgraphs.html "task-subgraphs.html")

Replace wires with portals

Organize with nested graphs

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/implementing-a-graph-tool.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* Implementing a Graph Tool

Add a graph node window reference

Implement a graph tool

# Implementing a Graph Tool

Explore how to create and implement a graph tool within your Unity projects.

| **Topic** | **Description** |
| --- | --- |
| **[Implement a graph tool](implement-a-graph-tool.html "implement-a-graph-tool.html")** | Create and implement a graph tool to visualize and manage complex data structures in Unity. |
| **[Introduction to nodes](node-introduction.html "node-introduction.html")** | Understand nodes, their parts, and the different types of nodes. |
| **[Implement nodes for your graph tool](implement-nodes.html "implement-nodes.html")** | Create custom node types with input and output ports. |
| **[Implement context nodes](implement-context-nodes.html "implement-context-nodes.html")** | Create context nodes to organize and contain block nodes in the graph tool. |
| **[Implement block nodes for your graph tool](implement-block-nodes.html "implement-block-nodes.html")** | Create block nodes to enhance the functionality of your graph tool in Unity. |
| **[Implement node options](implement-node-options.html "implement-node-options.html")** | Customize node behavior and structure with configurable options. |
| **[Implement a toolbar element](add-custom-toolbar-actions "add-custom-toolbar-actions")** | You can add custom buttons to the toolbar by creating toolbar element classes. |
| **[Add subgraph support](add-subgraph-support.html "add-subgraph-support.html")** | Enable support for subgraphs in your graph tool. |
| **[Graph processing](graph-processing.html "graph-processing.html")** | Provide feedback to users about the state of their graph, and guide them in making the necessary corrections. |

## Additional resources

* [Graph window reference](graph-window.html "graph-window.html")
* [Graph Toolkit interface](landing-graph-interface.html "landing-graph-interface.html")

Add a graph node window reference

Implement a graph tool

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/task-align.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Working with graphs](../gtk/landing-working-graphs.html "../gtk/landing-working-graphs.html")
* [Organizing graphs](../gtk/landing-organize-graphs.html "../gtk/landing-organize-graphs.html")
* Arrange graph elements

Organizing graphs

Group graph elements

# Arrange graph elements

Arrange graph elements in the canvas.

To spatially organize the graph elements in the graph canvas, you can distribute them across the canvas or align them with one another. You can also snap elements to the canvas grid.

This page covers how to arrange graph elements in the canvas only. For information on how to graph elements with placemats, refer to [Group graph elements](task-placemat.html "task-placemat.html"). For information about how to manage nodes, refer to [Manage the nodes in your graph](task-manage-nodes.html "task-manage-nodes.html").

## Align and distribute graph elements

To align selected graph elements in the canvas along a common axis, right-click, and select **Align Elements**.

You can align the elements along their top, bottom, left, or right edges, or by their horizontal or vertical centers.

To evenly space selected graph elements across the canvas, right-click, and select **Distribute Elements**.

You can distribute the elements vertically or horizontally.

## Snap graph elements

To set your Unity Editor preferences to position elements using grid-based alignment:

1. Open the [**Preferences**](../preferences-graph.html "../preferences-graph.html") window.
2. In the **Graph** section, enable the snapping properties.

## Additional resources

* [Preferences](../preferences.html "../preferences.html")
* [Manage the nodes in your graph](task-manage-nodes.html "task-manage-nodes.html")

Organizing graphs

Group graph elements

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/gtk-overlay.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* [Graph Toolkit interface](../gtk/landing-graph-interface.html "../gtk/landing-graph-interface.html")
* Graph Toolkit overlay reference

MiniMap window reference

Add a graph node window reference

# Graph Toolkit overlay reference

Explore the properties of the Graph Toolkit overlay to perform common actions.

Use the Graph Toolkit overlay to save, toggle windows on and off, and view the graph hierarchy through breadcrumbs. You can use Unity’s overlay system to add additional buttons.

For more information about how to display, hide, or change the position of an overlay, refer to [Change the appearance and position of an overlay](../overlays-position-and-display.html "../overlays-position-and-display.html"). For information about other overlays, refer to the [Overlays reference](../overlays-reference.html "../overlays-reference.html").

## Graph Toolkit overlay properties

The Graph Toolkit overlay contains the following properties:

| **Property** | **Description** |
| --- | --- |
| **Save** | Saves changes to the graph. This property is available only when **Asset Management** is enabled in the overlay. |
| **Show in Project Window** | Highlights the graph asset in the Project window. This property is available only when **Asset Management** is enabled in the overlay. |
| **Breadcrumbs** | Shows a graph hierarchy and nesting, so you can navigate between levels. |
| **Blackboard** | Displays or hides the [Blackboard window](blackboard.html "blackboard.html"), which you can use to create and manage variables. |
| **Graph Inspector** | Displays or hides the [Graph Inspector window](graph-inspector.html "graph-inspector.html"), which you can use to view and modify the settings of graph elements. |
| **Asset Management** | Adds or removes the **Show** and **Show in Project Window** buttons from the overlay. |
| **Error Notifications** | Displays or hides the number of errors in the graph. |
| **MiniMap** | Displays or hides [a small overview of the entire graph](minimap.html "minimap.html"). |

## Additional resources

* [Change the appearance and position of an overlay](../overlays-position-and-display.html "../overlays-position-and-display.html")
* [Overlays reference](../overlays-reference.html "../overlays-reference.html")
* [Blackboard window](blackboard.html "blackboard.html")
* [Graph Inspector window](graph-inspector.html "graph-inspector.html")
* [MiniMap](minimap.html "minimap.html")

MiniMap window reference

Add a graph node window reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/gtk/landing-graph-interface.html

* [Extending the Unity Editor](../extending-the-editor.html "../extending-the-editor.html")
* [Extending the Editor with Graph Toolkit](../gtk/gtk-index.html "../gtk/gtk-index.html")
* Graph Toolkit interface

Extending the Editor with Graph Toolkit

Graph window reference

# Graph Toolkit interface

Explore the user interface of Graph Toolkit.

Graph Toolkit is a front-end framework you can use to build custom graph tools. Multiple windows make up its user interface.

This section covers the Graph Toolkit interface only. For information on how to use Graph Toolkit, refer to [Implementing a graph tool](implementing-a-graph-tool.html "implementing-a-graph-tool.html").

| **Topic** | **Description** |
| --- | --- |
| **[Graph window reference](graph-window.html "graph-window.html")** | Explore the properties of the Graph window to create graphs. |
| **[Blackboard window reference](blackboard.html "blackboard.html")** | Explore the Blackboard window settings to create and organize variables. |
| **[Graph Inspector window reference](graph-inspector.html "graph-inspector.html")** | View and modify the settings of the selected graph elements. |
| **[MiniMap window reference](minimap.html "minimap.html")** | Explore the properties of the MiniMap window to view where the parts of the graph fit into the overall graph structure. |
| **[Graph Toolkit overlay reference](gtk-overlay.html "gtk-overlay.html")** | Explore the properties of the Graph Toolkit overlay to perform common actions. |
| **[Add a graph node window reference](graph-item-library.html "graph-item-library.html")** | Explore the properties and settings of the window to search for, browse, and insert graph elements directly into the canvas. |

## Additional resources

* [Graph window reference](graph-window.html "graph-window.html")
* [Blackboard window reference](blackboard.html "blackboard.html")
* [Graph Inspector window reference](graph-inspector.html "graph-inspector.html")
* [MiniMap](minimap.html "minimap.html")
* [Graph Toolkit overlay](gtk-overlay.html "gtk-overlay.html")
* [Add a graph node window reference](graph-item-library.html "graph-item-library.html")
* [Implementing a graph tool](implementing-a-graph-tool.html "implementing-a-graph-tool.html")

Extending the Editor with Graph Toolkit

Graph window reference

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/accessibility/_index.html

* Accessibility

Create TreeView with IMGUI

Introduction to the Accessibility module

# Accessibility

Implement accessibility features in Unity to create inclusive games and applications for users of all abilities.

When you implement accessibility features, you enable people with disabilities to engage with your content while also improving the user experience for everyone.

| **Topic** | **Description** |
| --- | --- |
| [Introduction to the Accessibility module](module-intro.html "module-intro.html") | Learn about Unity’s Accessibility module, its purpose, capabilities, and platform support. |
| [Get started with screen reader support](screen-readers-get-started.html "screen-readers-get-started.html") | Use the screen reader support APIs to make your first accessible button. |
| [The architecture and performance of the Accessibility module](module-architecture.html "module-architecture.html") | Discover the architecture of the Accessibility module, including its core components, key concepts, lifecycle, and performance considerations. |
| [Accessibility concepts](accessibility-concepts/_index.html "accessibility-concepts/_index.html") | Learn the background concepts that underpin accessible development, including disability categories, assistive technologies, and how screen readers work. |

## Additional resources

* 📚 **Documentation**: [Accessibility module API reference](../../ScriptReference/UnityEngine.AccessibilityModule.html "../../ScriptReference/UnityEngine.AccessibilityModule.html")
* 📺 **Video**: [Reach new audiences with Accessibility and Localization in Unity 6 (Unite 2025)](https://youtu.be/Ezz7R--kf6c?si=gnPx8uJTcgCF02an "https://youtu.be/Ezz7R--kf6c?si=gnPx8uJTcgCF02an")
* ⚙️ **Sample project**: [LetterSpell: example of an accessible Unity application](https://github.com/Unity-Technologies/a11y-public-sample "https://github.com/Unity-Technologies/a11y-public-sample")
* 👥 **Community**: [Unity Discussions: Accessibility](https://discussions.unity.com/tag/Accessibility-Features "https://discussions.unity.com/tag/Accessibility-Features")

Create TreeView with IMGUI

Introduction to the Accessibility module

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/accessibility/screen-readers-get-started.html

* [Accessibility](../accessibility/_index.html "../accessibility/_index.html")
* Get started with screen reader support

Introduction to the Accessibility module

The architecture and performance of the Accessibility module

# Get started with screen reader support

The screen reader support APIs are agnostic of the UI system, so they work with UI Toolkit, uGUI, custom UI frameworks, and non-UI content such as 2D or 3D objects in the game world. For simplicity, this guide uses UI Toolkit, but you can adapt the code to your UI framework of choice.

## Example overview

This example illustrates how to create an accessibility node, connect it to a UI Toolkit button, and test it with platform screen readers. By the end, you’ll have a button that native screen readers can read and activate.

## Prerequisites

This guide is for developers familiar with the Unity Editor, UI Toolkit, and C# scripting. Before you start, get familiar with the following:

* [UI Toolkit](../UIElements.html "../UIElements.html")
* [Screen readers](accessibility-concepts/screen-readers-intro.html "accessibility-concepts/screen-readers-intro.html")
* [Accessibility module](../../ScriptReference/UnityEngine.AccessibilityModule.html "../../ScriptReference/UnityEngine.AccessibilityModule.html")

## Enable the Accessibility module

The [Accessibility module](../../ScriptReference/UnityEngine.AccessibilityModule.html "../../ScriptReference/UnityEngine.AccessibilityModule.html") is enabled by default. If for some reason it’s not enabled in your project, do the following to enable it:

1. Select **Window** > **Package Management** > **Package Manager** to open the **Package Manager**.
2. Select the **Built-in** section.
3. Select the **Accessibility** module.
4. Select **Enable**.

## Create the button

Use UI Toolkit to create a **Start Game** button in your scene.

1. Create a project with any template.
2. Create a UXML file named `AccessibleStartMenu.uxml` with the following content:

   ```
   <ui:UXML xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ui="UnityEngine.UIElements" xmlns:uie="UnityEditor.UIElements" noNamespaceSchemaLocation="../../../UIElementsSchema/UIElements.xsd" editor-extension-mode="False">
       <ui:Button text="Start Game" name="startButton"/>
   </ui:UXML>
   ```
3. Create a C# script named `AccessibleStartMenu.cs` with the following content:

```
using UnityEngine;
using UnityEngine.UIElements;

public class AccessibleStartMenu : MonoBehaviour
{
    Button m_Button;

    void OnEnable()
    {
        VisualElement root = GetComponent<UIDocument>().rootVisualElement;
        m_Button = root.Q<Button>("startButton");

        m_Button.clicked += OnButtonClicked;
    }

    void OnDisable()
    {
        m_Button.clicked -= OnButtonClicked;
    }

    void OnButtonClicked()
    {
        Debug.Log("Start Game button clicked");
    }
}
```

## Create the accessibility hierarchy

The accessibility hierarchy is a semantic representation of your UI that screen readers use to discover and interact with your content. Screen readers cannot detect `GameObject` components or UI elements directly. They rely on this hierarchy to navigate your application. You create an [`AccessibilityHierarchy`](../../ScriptReference/Accessibility.AccessibilityHierarchy.html "../../ScriptReference/Accessibility.AccessibilityHierarchy.html"), then add an [`AccessibilityNode`](../../ScriptReference/Accessibility.AccessibilityNode.html "../../ScriptReference/Accessibility.AccessibilityNode.html") that represents the **Start Game** button.

To create the accessibility hierarchy:

1. Add the `UnityEngine.Accessibility` namespace.
2. Create an [`AccessibilityHierarchy`](../../ScriptReference/Accessibility.AccessibilityHierarchy.html "../../ScriptReference/Accessibility.AccessibilityHierarchy.html") instance.
3. Create and add an [`AccessibilityNode`](../../ScriptReference/Accessibility.AccessibilityNode.html "../../ScriptReference/Accessibility.AccessibilityNode.html") to the accessibility hierarchy.
4. Set the [`label`](../../ScriptReference/Accessibility.AccessibilityNode-label.html "../../ScriptReference/Accessibility.AccessibilityNode-label.html"), [`role`](../../ScriptReference/Accessibility.AccessibilityNode-role.html "../../ScriptReference/Accessibility.AccessibilityNode-role.html"), and [`state`](../../ScriptReference/Accessibility.AccessibilityNode-state.html "../../ScriptReference/Accessibility.AccessibilityNode-state.html") properties of the node according to the button’s text and interactable state.

```
// ...
using UnityEngine.Accessibility;

public class AccessibleStartMenu : MonoBehaviour
{
    // ...

    AccessibilityHierarchy m_AccessibilityHierarchy;
    AccessibilityNode m_AccessibilityNode;

    void OnEnable()
    {
        // ...

        CreateAccessibilityHierarchy();
    }

    // ...

    void CreateAccessibilityHierarchy()
    {
        // Create a new accessibility hierarchy.
        m_AccessibilityHierarchy = new AccessibilityHierarchy();

        // Create a new accessibility node with the button's text as the label
        // (what the screen readers announces).
        m_AccessibilityNode = m_AccessibilityHierarchy.AddNode(m_Button.text);

        // Set a semantic role (tells the screen reader this is a button).
        m_AccessibilityNode.role = AccessibilityRole.Button;

        // Set the state (is it currently interactable?).
        m_AccessibilityNode.state = m_Button.enabledSelf ?
            AccessibilityState.None : AccessibilityState.Disabled;
    }
}
```

## Set the node’s screen coordinates according to the button’s size and position

To set the node’s screen coordinates:

1. Track the button’s changes in size and position.
2. Calculate its screen coordinates from its world coordinates and the UI scale factor.
3. Set the node’s [`frame`](../../ScriptReference/Accessibility.AccessibilityNode-frame.html "../../ScriptReference/Accessibility.AccessibilityNode-frame.html") property to the calculated screen rectangle.

Update the `AccessibleStartMenu.cs` script as below:

```
public class AccessibleStartMenu : MonoBehaviour
{
    // ...

    void OnEnable()
    {
        // ...

        m_Button.RegisterCallback<GeometryChangedEvent>(OnGeometryChanged);
    }

    void OnDisable()
    {
        // ...

        m_Button.UnregisterCallback<GeometryChangedEvent>(OnGeometryChanged);
    }

    // ...

    void OnGeometryChanged(GeometryChangedEvent evt)
    {
        Rect worldRect = m_Button.worldBound;
        float scale = m_Button.panel.scaledPixelsPerPoint;

        // Update the screen coordinates of the node.
        m_AccessibilityNode.frame =
            new Rect(worldRect.position * scale, worldRect.size * scale);
    }
}
```

## Connect the node’s activation event to the button

Subscribe to the node’s [`invoked`](../../ScriptReference/Accessibility.AccessibilityNode-invoked.html "../../ScriptReference/Accessibility.AccessibilityNode-invoked.html") event, which is triggered when the user activates the node via the screen reader, then invoke the button’s [`NavigationSubmitEvent`](../../ScriptReference/UIElements.NavigationSubmitEvent.html "../../ScriptReference/UIElements.NavigationSubmitEvent.html") in the event handler.

Update the `CreateAccessibilityHierarchy` method in the `AccessibleStartMenu.cs` script as below:

```
public class AccessibleStartMenu : MonoBehaviour
{
    // ...

    void CreateAccessibilityHierarchy()
    {
        // ...

        // Handle when the user activates this node (e.g., double-tap).
        // Called `selected` in versions before Unity 6.3.
        m_AccessibilityNode.invoked += () =>
        {
            using var evt = NavigationSubmitEvent.GetPooled();
            evt.target = m_Button;
            m_Button.SendEvent(evt);

            return true;
        };
    }
}
```

## Activate the accessibility hierarchy when a screen reader is enabled

1. When the menu appears, activate the accessibility hierarchy by assigning it to [`AssistiveSupport.activeHierarchy`](../../ScriptReference/Accessibility.AssistiveSupport-activeHierarchy.html "../../ScriptReference/Accessibility.AssistiveSupport-activeHierarchy.html").
   * When the user turns the screen reader off, `AssistiveSupport.activeHierarchy` is automatically set to `null` to free resources.
2. Re-assign the hierarchy every time the user turns the screen reader on.
3. When the menu disappears, remove the hierarchy by setting `AssistiveSupport.activeHierarchy` to `null`.

```
public class AccessibleStartMenu : MonoBehaviour
{
    // ...

    void OnEnable()
    {
        // ...

        AssistiveSupport.activeHierarchy = m_AccessibilityHierarchy;
        AssistiveSupport.screenReaderStatusChanged += OnScreenReaderStatusChanged;
    }

    void OnDisable()
    {
        // ...

        AssistiveSupport.activeHierarchy = null;
        AssistiveSupport.screenReaderStatusChanged -= OnScreenReaderStatusChanged;
    }

    // ...

    void OnScreenReaderStatusChanged(bool enabled)
    {
        if (enabled)
        {
            AssistiveSupport.activeHierarchy = m_AccessibilityHierarchy;
        }
        // else
        // {
        //     // This is automatically done when the user turns the screen
        //     // reader off.
        //     AssistiveSupport.activeHierarchy = null;
        // }
    }
}
```

You created a semantic representation ([`AccessibilityNode`](../../ScriptReference/Accessibility.AccessibilityNode.html "../../ScriptReference/Accessibility.AccessibilityNode.html")) of the visual button that screen readers can discover and interact with.

The complete `AccessibleStartMenu.cs` script is as follows:

```
using UnityEngine;
using UnityEngine.Accessibility;
using UnityEngine.UIElements;

public class AccessibleStartMenu : MonoBehaviour
{
    Button m_Button;

    AccessibilityHierarchy m_AccessibilityHierarchy;
    AccessibilityNode m_AccessibilityNode;

    void OnEnable()
    {
        VisualElement root = GetComponent<UIDocument>().rootVisualElement;
        m_Button = root.Q<Button>("startButton");

        m_Button.clicked += OnButtonClicked;
        m_Button.RegisterCallback<GeometryChangedEvent>(OnGeometryChanged);

        CreateAccessibilityHierarchy();

        AssistiveSupport.activeHierarchy = m_AccessibilityHierarchy;
        AssistiveSupport.screenReaderStatusChanged += OnScreenReaderStatusChanged;
    }

    void OnDisable()
    {
        m_Button.clicked -= OnButtonClicked;
        m_Button.UnregisterCallback<GeometryChangedEvent>(OnGeometryChanged);

        AssistiveSupport.activeHierarchy = null;
        AssistiveSupport.screenReaderStatusChanged -= OnScreenReaderStatusChanged;
    }

    void CreateAccessibilityHierarchy()
    {
        // Create a new accessibility hierarchy.
        m_AccessibilityHierarchy = new AccessibilityHierarchy();

        // Create a new accessibility node with the button's text as the label
        // (what the screen readers announces).
        m_AccessibilityNode = m_AccessibilityHierarchy.AddNode(m_Button.text);

        // Set a semantic role (tells the screen reader this is a button).
        m_AccessibilityNode.role = AccessibilityRole.Button;

        // Set the state (is it currently interactable?).
        m_AccessibilityNode.state = m_Button.enabledSelf ?
            AccessibilityState.None : AccessibilityState.Disabled;

        // Handle when the user activates this node (e.g., double-tap).
        // Called `selected` in versions before Unity 6.3.
        m_AccessibilityNode.invoked += () =>
        {
            using var evt = NavigationSubmitEvent.GetPooled();
            evt.target = m_Button;
            m_Button.SendEvent(evt);

            return true;
        };
    }

    void OnGeometryChanged(GeometryChangedEvent evt)
    {
        Rect worldRect = m_Button.worldBound;
        float scale = m_Button.panel.scaledPixelsPerPoint;

        // Update the screen coordinates of the node.
        m_AccessibilityNode.frame =
            new Rect(worldRect.position * scale, worldRect.size * scale);
    }

    void OnButtonClicked()
    {
        Debug.Log("Start Game button clicked");
    }

    void OnScreenReaderStatusChanged(bool isEnabled)
    {
        if (isEnabled)
        {
            AssistiveSupport.activeHierarchy = m_AccessibilityHierarchy;
        }
        // else
        // {
        //     // This is automatically done when the user turns the screen
        //     // reader off.
        //     AssistiveSupport.activeHierarchy = null;
        // }
    }
}
```

## Attach the script

To attach the script to your scene:

1. Create an empty `GameObject` in your scene and name it `AccessibleStartMenu`.
2. Add a `UI Document` component to the `GameObject`.
3. Create a Panel Settings Asset and assign it to the `Panel Settings` field in the Inspector window of the `UI Document` component.
4. Assign the `AccessibleStartMenu.uxml` file to the `Source Asset` field.
5. Add the `AccessibleStartMenu.cs` script to the `GameObject`.

## Test the hierarchy and node properties in Play mode

To test the hierarchy and node properties in the Unity Editor:

1. Enter Play mode.
2. Select **Window** > **Accessibility** > **Hierarchy Viewer**.
3. Verify that the accessibility hierarchy shows the accessibility node with the correct properties.

![The Accessibility Hierarchy Viewer displaying the properties of the accessibility node representing the Start Game button](../../uploads/Main/a11y-hierarchy-viewer-get-started.png)


The Accessibility Hierarchy Viewer displaying the properties of the accessibility node representing the “Start Game” button

## Test the screen reader interaction on your target platform

To test screen reader interaction on your target platform:

1. Build and run the application on your target platform (Android, iOS, Windows, or macOS).
2. Get familiar with the gestures or commands of your platform’s built-in screen reader:
   * **Android**: [TalkBack gestures on Android](https://support.google.com/accessibility/android/answer/6151827 "https://support.google.com/accessibility/android/answer/6151827")
   * **iOS**: [VoiceOver gestures on iPhone](https://support.apple.com/en-us/guide/iphone/iph3e2e2281/ios "https://support.apple.com/en-us/guide/iphone/iph3e2e2281/ios")
   * **Windows**: [Narrator commands on Windows](https://support.microsoft.com/en-us/windows/chapter-2-narrator-basics-5ff4591e-7b6d-245e-c95d-ce83c0a1a8d4 "https://support.microsoft.com/en-us/windows/chapter-2-narrator-basics-5ff4591e-7b6d-245e-c95d-ce83c0a1a8d4")
   * **macOS**: [VoiceOver commands on Mac](https://support.apple.com/en-us/guide/voiceover/vo14111/mac "https://support.apple.com/en-us/guide/voiceover/vo14111/mac")
3. Enable the screen reader.
4. Navigate to the button using screen reader gestures or commands. The screen reader should be able to focus on the button and announce “Start Game, button”.
5. Activate the button using the screen reader’s activation gesture or command. The button should respond, and the text “Start Game button clicked” should appear in the [player log](../log-files.html "../log-files.html")The .log file created by a Standalone Player that contains a record of events, such as script execution times, the compiler version, and AssetImport time. Log files can help diagnose problems. [More info](../log-files.html#player "../log-files.html#player")  
   See in [Glossary](../Glossary.html#playerlog "../Glossary.html#playerlog").

## Additional resources

* 📚 **Documentation**: [Accessibility module API reference](../../ScriptReference/UnityEngine.AccessibilityModule.html "../../ScriptReference/UnityEngine.AccessibilityModule.html")
* 📺 **Video**: [Reach new audiences with Accessibility and Localization in Unity 6 (Unite 2025)](https://youtu.be/Ezz7R--kf6c?si=gnPx8uJTcgCF02an "https://youtu.be/Ezz7R--kf6c?si=gnPx8uJTcgCF02an")
* ⚙️ **Sample project**: [LetterSpell: example of an accessible Unity application](https://github.com/Unity-Technologies/a11y-public-sample "https://github.com/Unity-Technologies/a11y-public-sample")
* 👥 **Community**: [Unity Discussions: Accessibility](https://discussions.unity.com/tag/Accessibility-Features "https://discussions.unity.com/tag/Accessibility-Features")

Introduction to the Accessibility module

The architecture and performance of the Accessibility module

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/accessibility/module-intro.html

* [Accessibility](../accessibility/_index.html "../accessibility/_index.html")
* Introduction to the Accessibility module

Accessibility

Get started with screen reader support

# Introduction to the Accessibility module

Accessibility means designing experiences that people with disabilities can use. This includes people who rely on assistive technologies such as screen readers, as well as those who use system settings such as large text or closed captions. For background on disability categories, assistive technologies, and why accessibility matters, refer to [Accessibility concepts](accessibility-concepts/_index.html "accessibility-concepts/_index.html").

The Unity [Accessibility module](../../ScriptReference/UnityEngine.AccessibilityModule.html "../../ScriptReference/UnityEngine.AccessibilityModule.html") enables games and applications to communicate with native screen readers and respond to the system accessibility settings on the user’s device. This module helps you transform visual interfaces into experiences that everyone can use.

The Accessibility module is enabled by default. If it is not enabled in your project, you can enable it through the [Package Manager](screen-readers-get-started.html#enable-the-accessibility-module "screen-readers-get-started.html#enable-the-accessibility-module").

## Native screen reader support

The major mobile and desktop operating systems have built-in [screen readers](accessibility-concepts/screen-readers-intro.html "accessibility-concepts/screen-readers-intro.html").

The following table lists the platforms and screen readers that the Accessibility module supports:

| **Platform** | **Screen reader** |
| --- | --- |
| **Android** | [TalkBack](https://support.google.com/accessibility/android/topic/3529932?ref_topic=9078845 "https://support.google.com/accessibility/android/topic/3529932?ref_topic=9078845") |
| **iOS** | [VoiceOver](https://support.apple.com/en-us/guide/iphone/iph3e2e415f/ios "https://support.apple.com/en-us/guide/iphone/iph3e2e415f/ios") |
| **Windows** | [Narrator](https://support.microsoft.com/en-us/windows/complete-guide-to-narrator-e4397a0d-ef4f-b386-d8ae-c172f109bdb1 "https://support.microsoft.com/en-us/windows/complete-guide-to-narrator-e4397a0d-ef4f-b386-d8ae-c172f109bdb1") |
| **macOS** | [VoiceOver](https://support.apple.com/en-us/guide/voiceover/welcome/mac "https://support.apple.com/en-us/guide/voiceover/welcome/mac") |

You create accessibility metadata that screen readers understand, and the module handles the platform-specific translation automatically.

### Core capabilities

The Accessibility module enables you to:

* Create navigable interfaces for screen reader users
* Provide text alternatives for visual content
* Define semantic roles, such as button, slider, heading, and image
* Expose interactive states, such as disabled, selected, and expanded
* Notify screen readers of dynamic content changes
* Handle screen reader notifications of user actions
* Work alongside any UI system, including Unity UI and custom UI frameworks
* Add screen reader support to any game objects in a 2D or 3D world

**Note**: Because the Accessibility module uses native APIs, the expected behavior of the module’s APIs depends on the platform, operating system version, and screen reader. Always test your application with the target screen readers.

### Limitations

The Accessibility module has the following limitations:

* It supports only the screen readers listed above. It does not cover other screen readers or assistive technologies.
* It does not derive the accessibility hierarchy from your scene or UI automatically. You must create and update the accessibility hierarchy to match what elements you want to expose to screen readers.
* It has no awareness of the scene or UI hierarchy. You must synchronize accessibility data with the visual elements in your own code.
* Due to differences among the platform-native APIs, certain Accessibility module APIs have platform-specific limitations. These are described in the [Accessibility module API documentation](../../ScriptReference/UnityEngine.AccessibilityModule.html "../../ScriptReference/UnityEngine.AccessibilityModule.html").

### Technical overview

Use the [`AssistiveSupport`](../../ScriptReference/Accessibility.AssistiveSupport.html "../../ScriptReference/Accessibility.AssistiveSupport.html") API to enable screen reader support for your application. This class stores the accessibility hierarchy that you create, allows your application to notify the screen reader of changes in your UI, and notifies your application of events based on user actions.

The Accessibility module uses a node-based [`AccessibilityHierarchy`](../../ScriptReference/Accessibility.AccessibilityHierarchy.html "../../ScriptReference/Accessibility.AccessibilityHierarchy.html") separate from the `GameObject` hierarchy. You create [`AccessibilityNode`](../../ScriptReference/Accessibility.AccessibilityNode.html "../../ScriptReference/Accessibility.AccessibilityNode.html") instances that represent visual elements in your UI and game world. Each node has properties that define its label, value, role, state, and relationships to other nodes.

```
Your active Unity scene (visual)                        AssistiveSupport (semantic)
└── Canvas (uGUI) / UI Document (UI Toolkit)            └── AccessibilityHierarchy
    └── Button                                              └── AccessibilityNode
        └── Text: "Start Game"                                  ├── Label: "Start Game"
                                                                └── Role: Button
```

You can use the **Accessibility Hierarchy Viewer** (menu: **Window** > **Accessibility** > **Accessibility Hierarchy Viewer**) during Play mode to view your active accessibility hierarchy in real-time.

### Platform translation

When you set a node’s role, the Accessibility module translates it to the corresponding native API:

| **Platform** | **Native API** | **Native node representation** |
| --- | --- | --- |
| **Android** | [android.view.accessibility](https://developer.android.com/reference/android/view/accessibility/package-summary "https://developer.android.com/reference/android/view/accessibility/package-summary") | `AccessibilityNodeInfo` with `className` = `"android.widget.Button"` |
| **iOS** | [UIAccessibility](https://developer.apple.com/documentation/uikit/uiaccessibility-protocol?language=objc "https://developer.apple.com/documentation/uikit/uiaccessibility-protocol?language=objc") | `UIAccessibilityElement` with `accessibilityTraits` = `UIAccessibilityTraitButton` |
| **Windows** | [UI Automation](https://learn.microsoft.com/en-us/windows/win32/winauto/entry-uiauto-win32 "https://learn.microsoft.com/en-us/windows/win32/winauto/entry-uiauto-win32") | `IRawElementProviderSimple` with `ControlType` = `UIA_ButtonControlTypeId` |
| **macOS** | [NSAccessibility](https://developer.apple.com/documentation/appkit/nsaccessibilityprotocol?language=objc "https://developer.apple.com/documentation/appkit/nsaccessibilityprotocol?language=objc") | `NSAccessibilityElement` with `accessibilityRole` = `NSAccessibilityButtonRole` |

### Event flow

The following diagram illustrates the flow of events between a screen reader user, the operating system, Unity’s Accessibility module, and your application when a user interacts with an accessible button in your UI:

```
The user activates the button with the screen reader
    → The operating system sends the activation event to Unity
        → Unity translates the event to AccessibilityNode.invoked
            → Your event handler invokes the click event on the button
                → The button responds normally
```

### Supported UI elements

The Accessibility module supports many common [UI elements](../../ScriptReference/Accessibility.AccessibilityRole.html "../../ScriptReference/Accessibility.AccessibilityRole.html"), including the following elements with their expected properties and events:

| **Element** | **Role** | **Properties and events** |
| --- | --- | --- |
| [Button](../UIE-uxml-element-Button.html "../UIE-uxml-element-Button.html") | [`AccessibilityRole.Button`](../../ScriptReference/Accessibility.AccessibilityRole.Button.html "../../ScriptReference/Accessibility.AccessibilityRole.Button.html") | [`AccessibilityNode.invoked`](../../ScriptReference/Accessibility.AccessibilityNode-invoked.html "../../ScriptReference/Accessibility.AccessibilityNode-invoked.html") |
| [Slider](../UIE-uxml-element-Slider.html "../UIE-uxml-element-Slider.html") | [`AccessibilityRole.Slider`](../../ScriptReference/Accessibility.AccessibilityRole.Slider.html "../../ScriptReference/Accessibility.AccessibilityRole.Slider.html") | [`AccessibilityNode.value`](../../ScriptReference/Accessibility.AccessibilityNode-value.html "../../ScriptReference/Accessibility.AccessibilityNode-value.html"), [`AccessibilityNode.incremented`](../../ScriptReference/Accessibility.AccessibilityNode-incremented.html "../../ScriptReference/Accessibility.AccessibilityNode-incremented.html"), [`AccessibilityNode.decremented`](../../ScriptReference/Accessibility.AccessibilityNode-decremented.html "../../ScriptReference/Accessibility.AccessibilityNode-decremented.html") |
| [Toggle](../UIE-uxml-element-Toggle.html "../UIE-uxml-element-Toggle.html")A checkbox that allows the user to switch an option on or off. [More info](../UIE-uxml-element-Toggle.html "../UIE-uxml-element-Toggle.html") See in [Glossary](../Glossary.html#Toggle "../Glossary.html#Toggle") | [`AccessibilityRole.Toggle`](../../ScriptReference/Accessibility.AccessibilityRole.Toggle.html "../../ScriptReference/Accessibility.AccessibilityRole.Toggle.html") | [`AccessibilityState.Selected`](../../ScriptReference/Accessibility.AccessibilityState.Selected.html "../../ScriptReference/Accessibility.AccessibilityState.Selected.html"), [`AccessibilityState.None`](../../ScriptReference/Accessibility.AccessibilityState.None.html "../../ScriptReference/Accessibility.AccessibilityState.None.html") |
| [Text input](../UIE-uxml-element-TextField.html "../UIE-uxml-element-TextField.html") | [`AccessibilityRole.TextField`](../../ScriptReference/Accessibility.AccessibilityRole.TextField.html "../../ScriptReference/Accessibility.AccessibilityRole.TextField.html") | [`AccessibilityNode.value`](../../ScriptReference/Accessibility.AccessibilityNode-value.html "../../ScriptReference/Accessibility.AccessibilityNode-value.html") |
| [Dropdown](../UIE-uxml-element-DropdownField.html "../UIE-uxml-element-DropdownField.html") | [`AccessibilityRole.Dropdown`](../../ScriptReference/Accessibility.AccessibilityRole.Dropdown.html "../../ScriptReference/Accessibility.AccessibilityRole.Dropdown.html") | [`AccessibilityNode.value`](../../ScriptReference/Accessibility.AccessibilityNode-value.html "../../ScriptReference/Accessibility.AccessibilityNode-value.html"), [`AccessibilityState.Expanded`](../../ScriptReference/Accessibility.AccessibilityState.Expanded.html "../../ScriptReference/Accessibility.AccessibilityState.Expanded.html"), [`AccessibilityState.None`](../../ScriptReference/Accessibility.AccessibilityState.None.html "../../ScriptReference/Accessibility.AccessibilityState.None.html"), and child nodes for options |

## System accessibility settings

Use the [`AccessibilitySettings`](../../ScriptReference/Accessibility.AccessibilitySettings.html "../../ScriptReference/Accessibility.AccessibilitySettings.html") API to retrieve and listen to updates in the native font scaling, bold text, and closed captions settings on the user’s device, and adjust your UI and game experience accordingly. This improves usability for people with low vision, hearing impairments, and cognitive disabilities, as well as users in noisy or silent environments or those whose first language differs from the language of your game or application.

The accessibility settings APIs are available for **Android** and **iOS**.

## Additional resources

* 📚 **Documentation**: [Accessibility module API reference](../../ScriptReference/UnityEngine.AccessibilityModule.html "../../ScriptReference/UnityEngine.AccessibilityModule.html")
* 👥 **Community**: [Mobile screen reader support in Unity](https://unity.com/blog/engine-platform/mobile-screen-reader-support-in-unity "https://unity.com/blog/engine-platform/mobile-screen-reader-support-in-unity")
* 👥 **Community**: [Desktop screen reader support in Unity](https://discussions.unity.com/t/native-desktop-screen-reader-support-now-available-in-unity-6-3/1681788 "https://discussions.unity.com/t/native-desktop-screen-reader-support-now-available-in-unity-6-3/1681788")
* 📺 **Video**: [Reach new audiences with Accessibility and Localization in Unity 6 (Unite 2025)](https://youtu.be/Ezz7R--kf6c?si=gnPx8uJTcgCF02an "https://youtu.be/Ezz7R--kf6c?si=gnPx8uJTcgCF02an")
* ⚙️ **Sample project**: [LetterSpell: example of an accessible Unity application](https://github.com/Unity-Technologies/a11y-public-sample "https://github.com/Unity-Technologies/a11y-public-sample")
* 👥 **Community**: [Unity Discussions: Accessibility](https://discussions.unity.com/tag/Accessibility-Features "https://discussions.unity.com/tag/Accessibility-Features")

Accessibility

Get started with screen reader support

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/accessibility/module-architecture.html

* [Accessibility](../accessibility/_index.html "../accessibility/_index.html")
* The architecture and performance of the Accessibility module

Get started with screen reader support

Accessibility concepts

# The architecture and performance of the Accessibility module

The [Accessibility module](../../ScriptReference/UnityEngine.AccessibilityModule.html "../../ScriptReference/UnityEngine.AccessibilityModule.html") bridges your application with platform accessibility APIs. It helps you translate your application’s interfaces into hierarchical data structures that screen readers understand and identify the user’s accessibility preferences so that you can adapt your user experience accordingly.

The Accessibility module consists of the following core components:

* [`AssistiveSupport`](../../ScriptReference/Accessibility.AssistiveSupport.html "../../ScriptReference/Accessibility.AssistiveSupport.html"): Main interface to the screen reader support APIs
* [`AccessibilityHierarchy`](../../ScriptReference/Accessibility.AccessibilityHierarchy.html "../../ScriptReference/Accessibility.AccessibilityHierarchy.html"): Hierarchical data model describing visual elements to screen readers
* [`AccessibilityNode`](../../ScriptReference/Accessibility.AccessibilityNode.html "../../ScriptReference/Accessibility.AccessibilityNode.html"): Data structure representing an individual visual element that needs to be accessible to screen reader users
* [`IAccessibilityNotificationDispatcher`](../../ScriptReference/Accessibility.IAccessibilityNotificationDispatcher.html "../../ScriptReference/Accessibility.IAccessibilityNotificationDispatcher.html"): Methods for sending notifications to screen readers (implemented in `AssistiveSupport`)
* [`AccessibilitySettings`](../../ScriptReference/Accessibility.AccessibilitySettings.html "../../ScriptReference/Accessibility.AccessibilitySettings.html"): Access point to system accessibility settings on the user’s device
* [`VisionUtility`](../../ScriptReference/Accessibility.VisionUtility.html "../../ScriptReference/Accessibility.VisionUtility.html"): Palette of colors distinguishable for colorblind users

## Key architectural concepts

These are the key concepts to understand when working with the Accessibility module:

### Separate accessibility hierarchy

Think of the accessibility hierarchy as a parallel structure that mirrors your scene hierarchy in terms that screen readers understand. Your visual elements exist in Unity’s scene hierarchy. The accessibility hierarchy describes that content in screen reader terms.

### Accessibility nodes

Each visual element in your application’s UI or game world that needs to be accessible to screen readers must have a corresponding accessibility node.

### Node state and properties

Accessibility nodes have properties like label, role, value, state, and relationships to other nodes. When you update the properties of a visual element, also update its corresponding accessibility node.

### Hierarchy and navigation

Screen readers traverse the accessibility hierarchy. Parent-child relationships affect focus order and element grouping. Flatten hierarchies where possible. Deeply nested structures make navigation difficult for screen reader users.

### Accessibility notifications

Notify the screen reader of significant changes via accessibility notifications. This keeps the screen reader in sync with your application’s interface.

### Platform abstraction

You write against Unity’s Accessibility API once. The module handles platform variations. Avoid platform-specific workarounds unless necessary.

## Module lifecycle stages

* Application start: Registration to application lifecycle events and platform accessibility events
* [`Update`](../../ScriptReference/MonoBehaviour.Update.html "../../ScriptReference/MonoBehaviour.Update.html"): Batch processing of accessibility events received from the operating system
* [`LateUpdate`](../../ScriptReference/MonoBehaviour.LateUpdate.html "../../ScriptReference/MonoBehaviour.LateUpdate.html"): Automatic refresh of accessibility node frames if the application window was previously moved or resized
* Application quit: Deregistration from application lifecycle events and platform accessibility events

## Performance considerations

The Accessibility module does not impact performance for users without a screen reader enabled, as most of its operations only function when a screen reader is detected.

The module triggers platform updates only when the user activates a screen reader or when you modify accessibility nodes or send accessibility notifications while a screen reader is active.

For typical UIs, accessibility hierarchy updates have minimal performance impact.

The following factors affect performance:

* Your application’s method of creating and managing the accessibility hierarchy
* The size of your accessibility hierarchy
* The frequency of accessibility hierarchy updates
* The frequency of accessibility notifications you send to the screen reader

Follow these best practices to minimize performance impact:

* Create accessibility nodes only for key interactive or informative elements.
* Create accessibility nodes only for elements that are visible on the screen.
* Avoid making accessibility updates every frame.
* Avoid sending accessibility notifications every frame.
* Send accessibility notifications only when strictly necessary.
* Test with screen readers on target devices.

## Accessibility Hierarchy Viewer

Unity’s Accessibility Hierarchy Viewer (**Window** > **Accessibility** > **Hierarchy Viewer**) helps you visualize your active accessibility hierarchy.

While in Play mode, the Accessibility Hierarchy Viewer shows:

* The current structure of the active accessibility hierarchy
* The current properties of your accessibility nodes

![The Accessibility Hierarchy Viewer displaying the accessibility nodes of an applications settings screen](../../uploads/Main/a11y-hierarchy-viewer.png)


The Accessibility Hierarchy Viewer displaying the accessibility nodes of an application’s settings screen

Use the Accessibility Hierarchy Viewer during development to verify your accessibility implementation. Compare the accessibility hierarchy to your application’s interface. Every interactive or informative element must have a corresponding accessibility node in the hierarchy with appropriate properties. When your UI or game world updates, the accessibility hierarchy must reflect those changes.

Test your accessibility implementation in the Unity Editor in Play mode, then build to a device and test with the target screen reader.

## Additional resources

* [Accessibility module](../../ScriptReference/UnityEngine.AccessibilityModule.html "../../ScriptReference/UnityEngine.AccessibilityModule.html") API documentation
* 📺 **Video**: [Reach new audiences with Accessibility and Localization in Unity 6 (Unite 2025)](https://youtu.be/Ezz7R--kf6c?si=gnPx8uJTcgCF02an "https://youtu.be/Ezz7R--kf6c?si=gnPx8uJTcgCF02an")
* ⚙️ **Sample project**: [LetterSpell: example of an accessible Unity application](https://github.com/Unity-Technologies/a11y-public-sample "https://github.com/Unity-Technologies/a11y-public-sample")
* 👥 **Community**: [Unity Discussions: Accessibility](https://discussions.unity.com/tag/Accessibility-Features "https://discussions.unity.com/tag/Accessibility-Features")

Get started with screen reader support

Accessibility concepts

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/accessibility/accessibility-concepts/_index.html

* [Accessibility](../../accessibility/_index.html "../../accessibility/_index.html")
* Accessibility concepts

The architecture and performance of the Accessibility module

Accessibility fundamentals

# Accessibility concepts

Learn the background concepts that underpin accessible development, including disability categories, assistive technologies, and how screen readers work.

| **Topic** | **Description** |
| --- | --- |
| [Accessibility fundamentals](fundamentals.html "fundamentals.html") | Understand disability categories, assistive technologies, universal design principles, and the human, legal, and business case for building accessible experiences. |
| [Screen readers](screen-readers-intro.html "screen-readers-intro.html") | Learn how screen readers work, what they need from your application, and best practices for supporting them. |

## Additional resources

* 📺 **Video**: [Reach new audiences with Accessibility and Localization in Unity 6 (Unite 2025)](https://youtu.be/Ezz7R--kf6c?si=gnPx8uJTcgCF02an "https://youtu.be/Ezz7R--kf6c?si=gnPx8uJTcgCF02an")
* ⚙️ **Sample project**: [LetterSpell: example of an accessible Unity application](https://github.com/Unity-Technologies/a11y-public-sample "https://github.com/Unity-Technologies/a11y-public-sample")
* 👥 **Community**: [Unity Discussions: Accessibility](https://discussions.unity.com/tag/Accessibility-Features "https://discussions.unity.com/tag/Accessibility-Features")

The architecture and performance of the Accessibility module

Accessibility fundamentals

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/accessibility/accessibility-concepts/fundamentals.html

* [Accessibility](../../accessibility/_index.html "../../accessibility/_index.html")
* [Accessibility concepts](../../accessibility/accessibility-concepts/_index.html "../../accessibility/accessibility-concepts/_index.html")
* Accessibility fundamentals

Accessibility concepts

Screen readers

# Accessibility fundamentals

Understand disability categories, assistive technologies, universal design principles, and the human, legal, and business case for building accessible experiences.

## Disability and access

Disability arises from mismatched interactions between a person’s abilities and their environment.

Disability is a natural part of the human experience. Disabilities can be permanent, temporary, or situational, and they affect people of all ages, backgrounds, and abilities.

Most disabilities are invisible (for example, chronic pain, cognitive differences, or hearing loss), and many people experience multiple disabilities simultaneously.

### The primary disability categories

The following table summarizes common disability types and accommodations:

| **Disability type** | **Description** | **Common accommodations** |
| --- | --- | --- |
| **Visual** | Affects how people see or process visual information. Includes blindness, low vision, color blindness, and light sensitivity. | Screen readers, large text sizes, high-contrast modes, alternative color schemes |
| **Auditory** | Affects hearing and sound processing. Includes deafness, hard of hearing, and auditory processing disorders. | Captions, transcripts, visual indicators of important sounds |
| **Motor** | Affects physical movement and control. Includes limited mobility, tremors, repetitive stress injuries, and paralysis. | Switch devices, voice control, eye tracking, modified keyboards |
| **Cognitive** | Affects thinking, learning, and memory. Includes learning disabilities, attention disorders, memory impairments, and processing difficulties. | Clear language, consistent layout and interaction patterns, reduced cognitive load |
| **Speech** | Affects verbal communication. Includes stuttering, aphasia, and other speech impairments. | Text-based communication, speech-generating devices, alternative input methods |

**Note**: Many people experience multiple disabilities simultaneously. Design solutions that work together, not in isolation.

### Common assistive technologies

The following table summarizes common assistive technologies that people with disabilities use to access digital content:

| **Assistive technology** | **Description** | **Examples** |
| --- | --- | --- |
| **Screen readers** | Convert visual content into speech or braille output. They announce visual elements, read text content, and describe interactive controls. | VoiceOver (iOS/macOS), TalkBack (Android), Narrator (Windows), JAWS (Windows), NVDA (Windows) |
| **Screen magnifiers** | Enlarge portions of the screen for users with low vision. Magnification can range from 2× to 16× or higher. | Built-in zoom features on iOS, macOS, Android, and Windows |
| **Switch devices** | Enable control through simple binary inputs activated by hand movement, head position, breath control, or eye blinks. One or two switches can navigate entire interfaces through scanning techniques. | Single-button switches, sip-and-puff devices |
| **Voice control** | Allow hands-free operation. Users speak commands to navigate, select, and manipulate interface elements. | Voice Control (iOS/macOS), Voice Access (Android), Dragon NaturallySpeaking (Windows) |
| **Alternative input devices** | Provide access for users who cannot use standard input methods. | Modified keyboards, trackballs, mouth sticks, eye-gaze systems |

## The importance of accessibility

Accessibility might seem optional or a nice-to-have feature for a minority of users. This is a common misconception. Accessibility intersects three critical domains: human impact, legal compliance, and competitive advantage. Whether you’re shipping games, enterprise applications, or educational software, these principles apply.

### Human impact

According to the [World Health Organization (WHO)](https://www.who.int/news-room/fact-sheets/detail/disability-and-health "https://www.who.int/news-room/fact-sheets/detail/disability-and-health"), an estimated 1.3 billion people experience significant disability. This represents 16% of the world’s population, or 1 in 6 people.

Vision impairment alone affects 2.2 billion people globally [(WHO)](https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment "https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment").

These numbers represent players, employees, students, and customers who want to engage with your digital experiences.

The following scenarios illustrate how accessibility affects real users:

* A person with ADHD uses text-to-speech to rapidly read long passages of text.
* A veteran with motor impairments plays games using only switch controls.
* A blind gamer navigates a 3D world using audio cues and navigation assists.
* An adult with declining vision relies on high contrast and large text size.

Accessible design removes barriers that prevent users from engaging with digital experiences.

### Legal requirements

**Note**: The following is a general overview for informational purposes only and does not constitute legal advice. Laws and regulations vary by jurisdiction and might change over time. Consult a qualified legal professional regarding your specific compliance obligations.

Accessibility is mandatory in many markets. Non-compliance creates legal and financial risk.

The foundation of most accessibility legislation around the world is the [United Nations Convention on the Rights of Persons with Disabilities (UNCRPD)](https://social.desa.un.org/issues/disability/crpd/convention-on-the-rights-of-persons-with-disabilities-crpd "https://social.desa.un.org/issues/disability/crpd/convention-on-the-rights-of-persons-with-disabilities-crpd"), adopted in 2006 and ratified by 193 countries. Its core aim is to remove barriers for people with disabilities and ensure they can participate fully and equally in all areas of society.

#### United States

[Section 508 of the Rehabilitation Act](https://www.access-board.gov/about/law/ra.html#section-508-federal-electronic-and-information-technology "https://www.access-board.gov/about/law/ra.html#section-508-federal-electronic-and-information-technology") mandates that federal agencies’ electronic content be accessible. Software developed for US federal agencies or for clients that receive federal funding might require compliance with [Web Content Accessibility Guidelines (WCAG) 2.0](https://www.w3.org/TR/WCAG20 "https://www.w3.org/TR/WCAG20") Level AA conformance. Government contracts typically require [VPAT (Voluntary Product Accessibility Template)](https://www.itic.org/policy/accessibility/vpat "https://www.itic.org/policy/accessibility/vpat") documentation. Demonstrating Section 508 compliance is typically required to bid on such contracts.

[The Americans with Disabilities Act (ADA)](https://www.ada.gov/law-and-regs/ada "https://www.ada.gov/law-and-regs/ada") prohibits discrimination against people with disabilities in all areas of public life. [Title II](https://www.ada.gov/law-and-regs/regulations/title-ii-2010-regulations "https://www.ada.gov/law-and-regs/regulations/title-ii-2010-regulations") covers public-sector organizations, including services and software purchased from their vendors. [Title III](https://www.ada.gov/law-and-regs/regulations/title-iii-regulations "https://www.ada.gov/law-and-regs/regulations/title-iii-regulations") applies to places of public accommodation, which can include websites and applications.

[The 21st Century Communications and Video Accessibility Act (CVAA)](https://www.govinfo.gov/content/pkg/PLAW-111publ260/pdf/PLAW-111publ260.pdf "https://www.govinfo.gov/content/pkg/PLAW-111publ260/pdf/PLAW-111publ260.pdf") requires accessibility for communication services (including electronic messaging, Voice over Internet Protocol, and video conferencing), which might include features in games and applications.

#### European Union

Through its [Strategy for the Rights of Persons with Disabilities 2021–2030](https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030_en "https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030_en"), the European Union is committed to a barrier-free Europe and to empowering persons with disabilities so they can enjoy their rights and participate fully in society and economy.

Under [the European Accessibility Act (EAA)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32019L0882 "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32019L0882"), customer-facing digital products sold in the EU are generally expected to meet the [EN 301 549](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf "https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf") standard. This aligns with [WCAG 2.1](https://www.w3.org/TR/WCAG21 "https://www.w3.org/TR/WCAG21") Level AA requirements but provides additional clauses that cover a broader range of products and services beyond websites and mobile apps.

### Business benefits

Accessible design creates better experiences for everyone, not just users with disabilities:

* Captions help commuters on silent trains and parents with sleeping babies.
* Keyboard navigation speeds up power users.
* Clear language reduces cognitive load for non-native speakers and tired professionals.
* Voice control enables hands-free cooking tutorials and exercise apps.

Beyond improved usability, accessible products offer measurable business advantages:

* Broader market reach: The global disability market controls $18.3 trillion in disposable income [(Return on Disability Group)](https://www.rod-group.com/wp-content/uploads/2024/09/The-Global-Economics-of-Disability-2024-The-Return-on-Disability-Group-September-24-2024.pdf "https://www.rod-group.com/wp-content/uploads/2024/09/The-Global-Economics-of-Disability-2024-The-Return-on-Disability-Group-September-24-2024.pdf"). Accessible products capture this market.
* Increased app store discoverability: Implementing and declaring accessibility support increases visibility in digital storefronts. Many platforms actively promote accessible apps through dedicated collections and featured listings.
* Enhanced reputation: Companies known for accessibility can attract a wider range of customers. Accessibility leadership can boost brand perception and recognition.
* Reduced support costs: Clear labels, logical navigation, and predictable interactions reduce user errors and support burden.

## Accessible game development

Accessible games can win awards and sell better due to an expanded market reach.

Games can implement accessibility in the following ways:

* Subtitles for dialog and closed captions for sound effects
* Screen reader support for menus and UI
* Customizable controls for motor impairments
* Visual and audio customization options
* Difficulty adjustments and assist modes
* Text chat alternatives for voice communication

Accessibility features often enable new gameplay possibilities. What you build for accessibility frequently improves the experience for players without disabilities.

## Universal design principles

Universal design creates experiences that work for everyone. These principles guide accessible development:

* Equitable use: Design works for people with diverse abilities.
* Flexibility: Accommodate individual preferences and abilities.
* Simple and intuitive: Easy to understand regardless of experience.
* Perceptible information: Communicate effectively to all senses.
* Tolerance for error: Minimize hazards and adverse consequences.
* Low physical effort: Use efficiently with minimal fatigue.
* Size and space: Provide appropriate size and space for use.

Apply these principles from your first design decision through the final testing.

## WCAG 2.2: The compliance baseline

[Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22 "https://www.w3.org/TR/WCAG22") is the international standard for digital accessibility and the starting point for most accessibility standards worldwide. In many jurisdictions, Level AA conformance is commonly referenced as the baseline in accessibility legislation.

WCAG organizes around four [principles](https://www.w3.org/WAI/fundamentals/accessibility-principles "https://www.w3.org/WAI/fundamentals/accessibility-principles"):

* Perceivable: Users must be able to perceive information.
  + Provide text alternatives for non-text content.
  + Create content that adapts to different presentations.
  + Make it easier to see and hear content.
* Operable: Users must be able to operate the interface.
  + Make all functionality keyboard accessible.
  + Give users enough time to read and interact.
  + Don’t design content that causes seizures.
  + Help users navigate and find content.
* Understandable: Users must understand the interface.
  + Make text readable and understandable.
  + Make content appear and operate predictably.
  + Help users avoid and correct mistakes.
* Robust: Content must work with current and future technologies.
  + Maximize compatibility with assistive technologies.

## Accessibility and innovation

When you solve for the edges, you discover solutions that are helpful for everyone. The curb cut (the sloped transition from sidewalk to street) was designed for wheelchair users. Now, it benefits delivery workers with carts, parents with strollers, travelers with luggage, and cyclists. One accessibility solution created convenience for millions.

When you build accessibility into your foundation, you create better experiences for your entire audience. More importantly, you position yourself to discover the next breakthrough feature that nobody knew they needed until you solved for accessibility first.

## Additional resources

* 👥 **Community**: [World Health Organization: Disability and health](https://www.who.int/news-room/fact-sheets/detail/disability-and-health "https://www.who.int/news-room/fact-sheets/detail/disability-and-health")
* 📚 **Documentation**: [Accessibility module API reference](../../../ScriptReference/UnityEngine.AccessibilityModule.html "../../../ScriptReference/UnityEngine.AccessibilityModule.html")

Accessibility concepts

Screen readers

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---


# Documento: en/Manual/accessibility/accessibility-concepts/screen-readers-intro.html

* [Accessibility](../../accessibility/_index.html "../../accessibility/_index.html")
* [Accessibility concepts](../../accessibility/accessibility-concepts/_index.html "../../accessibility/accessibility-concepts/_index.html")
* Screen readers

Accessibility fundamentals

Animation

# Screen readers

Screen readers are assistive technology that converts on-screen content into speech or refreshable braille output. They enable users who cannot see the screen or benefit from an additional sensory method to interact with your game or application. Screen readers interpret visual elements, provide auditory feedback about what’s on screen, and allow navigation through accessible touch gestures or keyboard commands.

## Screen reader users

People who are blind or have low vision represent the primary user base. However, screen reader users also include people with learning disabilities like dyslexia who process auditory information more effectively, some people with autism who benefit from multi-sensory input, and people with temporary vision impairments.

Some users combine screen readers with screen magnification. Others listen at high speeds while viewing the screen. Screen reader usage patterns vary as widely as the people who depend on them.

## How screen readers work

Screen readers transform a visual interface into an audio or tactile experience. They navigate through an **accessibility hierarchy**, a parallel structure that describes visual elements in text format.

When a screen reader encounters an application, it requests its accessibility hierarchy through the operating system. The OS queries the application through platform APIs. The application must respond with information such as element descriptions, states, and relationships.

Some screen readers navigate the accessibility hierarchy in a depth-first traversal order (navigating down child elements before moving to siblings), while others navigate based on the position of the elements on the screen.

As the user moves focus through accessible elements, the screen reader queries each element’s properties and announces relevant information.

The following diagram shows the announcement flow:

```
Your application's accessibility code provides information about the elements on the screen
    → The user navigates via the screen reader to a visual element (by touch, swipe, arrow key, etc.)
        → The screen reader queries the element's properties via the platform's accessibility API
            → The screen reader announces that information to the user
                → The user hears the element's description, value, role, state, and available actions
```

## What screen readers need from an application

Screen readers require specific information about each accessible element. This information is organized into a data structure called an **accessibility node**, whose properties fall into the following categories.

The following properties are required for all accessible elements:

| **Property** | **Description** |
| --- | --- |
| **Label** | The element’s name or concise description (such as button text or icon description). This is the main information the screen reader announces. |
| **Frame** | The element’s position and size on the screen, used for touch navigation and the focus indicator. |

The following properties are optional for relevant accessible elements:

| **Property** | **Description** |
| --- | --- |
| **Role** | The element’s type (such as button, slider, checkbox, or text field). This informs the screen reader of the element’s behavior and interaction model. |
| **Value** | The current value or content of the element (such as text content or slider value). |
| **State** | The current status of the element (such as disabled, checked, or expanded). |

The following properties provide navigation information:

| **Property** | **Description** |
| --- | --- |
| **Hierarchy** | The element’s parent and child relationships, used for linear navigation and grouping. |
| **Visibility** | Whether screen readers should “see” and focus on the element. |

The following properties define interaction capabilities:

| **Property** | **Description** |
| --- | --- |
| **Actions** | What users can do with the element (such as activate, adjust, dismiss, or expand). |
| **Hints** | Additional context about interacting with the element. |

## Screen reader user interaction patterns

### User input

When a screen reader is active, device interaction patterns change completely. For example, a single tap that normally activates a button instead announces the button to screen reader users. A swipe that normally scrolls instead navigates to the next element. Screen reader users employ entirely different gesture vocabularies or keyboard commands to navigate and interact with their devices.

Your application doesn’t need to handle specific touch or keyboard input (which can vary by platform, screen reader, and user preferences). When a screen reader is active, the operating system intercepts all user input and translates it into standard accessibility events, such as `activate` or `dismiss`. Your application only needs to respond to these high-level events.

### User navigation patterns

Screen reader users develop efficient navigation strategies. Understanding these patterns helps you design more intuitive experiences.

The following table summarizes common screen reader navigation patterns:

| **Navigation pattern** | **Description** | **Design guidance** |
| --- | --- | --- |
| **Linear exploration** | Moves through all elements sequentially. New users often explore this way initially. | Ensure that your focus order follows visual layout and logical flow. |
| **Landmark navigation** | Jumps between major sections. Users skip directly to headings, buttons, or form fields. | Use semantic roles to enable this pattern. |
| **Search and scan** | Lets users find specific content by keyword. Screen readers offer search functionality within pages. | Provide clear, concise labels that include intuitive terms. |
| **Rotor or quick-nav menu** | Categorizes elements by type. Users can list all buttons, all headings, or all containers separately. | Proper role assignment enables this feature. |

## Keeping screen readers informed

Screen readers build a mental model of your interface based on the accessibility hierarchy. When your UI changes, you must notify the screen reader so it can update its model and inform the user.

The following table summarizes common types of changes that require screen reader notifications:

| **Change type** | **When it occurs** | **What to do** |
| --- | --- | --- |
| **Screen or view changes** | The user navigates to a new screen, opens a dialog, or switches tabs. | Update your accessibility hierarchy and send the appropriate events so the screen reader can rebuild its understanding of the interface and move focus to the new content. |
| **Scrolling and content visibility** | Elements scroll in or out of view. | Update your accessibility hierarchy so the screen reader knows which elements are currently accessible. |
| **Dynamic content updates** | A loading indicator appears, a progress bar updates, or search results populate. | Trigger an announcement for meaningful state transitions that affect user understanding or available actions. Not every animation needs to be announced. |
| **Events outside user focus** | A download completes, a timer expires, or an error occurs outside the user’s current focus. | Use accessibility announcements to convey this information without requiring a focus change. |

## Common screen reader challenges

The following table lists the most common challenges when implementing screen reader support, along with strategies to address them:

| **Challenge** | **Problem** | **Solution** |
| --- | --- | --- |
| **Custom controls** | Screen readers expect standard roles and behaviors. A slider that looks like a dial still needs to behave like a slider. | Assign the appropriate role and map custom interactions to standard accessibility patterns. |
| **Overlapping elements** | Screen readers use element screen bounds for touch navigation. Overlapping bounds confuse spatial relationships. | Ensure accessible elements have accurate, non-overlapping frame rectangles. |
| **Rapid state changes** | Too many announcements overwhelm users. | Prioritize announcements that change available actions or affect the user’s understanding of the current state. Not every frame-by-frame update needs verbalization. |
| **Large numbers of elements** | Dense interfaces make it hard for screen reader users to find relevant content. | Not all objects in a game scene need to be accessible. Prioritize key interactive elements. |

## Testing your screen reader support

Always test with real screen readers on your target platforms — enable them in device settings and navigate your entire experience from start to finish. Real screen readers reveal issues that simulators or automated tools miss, and they confirm that your implementation works as intended for actual users.

Use the following checklist for basic verification:

* Every relevant element announces its label, value, and role
* Linear navigation (such as swipe or arrow keys) follows logical order
* State changes announce appropriately
* All element actions work via screen reader gestures or commands
* Elements hidden by menus or overlays are not accessible
* Modal dialogs trap focus correctly
* Dismissible overlays announce and close properly

## Additional resources

* [Introduction to the Accessibility module](../module-intro.html "../module-intro.html")
* [The architecture and performance of the Accessibility module](../module-architecture.html "../module-architecture.html")
* [Get started with screen reader support](../screen-readers-get-started.html "../screen-readers-get-started.html")

Accessibility fundamentals

Animation

Copyright ©2005-2026 Unity Technologies. All rights reserved. Built from job ID 72674933. Built on: 2026-08-01.

[Tutorials](https://learn.unity.com/ "https://learn.unity.com/")[Community Answers](https://answers.unity3d.com "https://answers.unity3d.com")[Knowledge Base](https://support.unity3d.com/hc/en-us "https://support.unity3d.com/hc/en-us")[Forums](https://forum.unity3d.com "https://forum.unity3d.com")[Asset Store](https://unity3d.com/asset-store "https://unity3d.com/asset-store")[Terms of use](https://docs.unity3d.com/Manual/TermsOfUse.html "https://docs.unity3d.com/Manual/TermsOfUse.html")[Legal](https://unity.com/legal "https://unity.com/legal")[Privacy Policy](https://unity.com/legal/privacy-policy "https://unity.com/legal/privacy-policy")[Cookies](https://unity.com/legal/cookie-policy "https://unity.com/legal/cookie-policy")[Do Not Sell or Share My Personal Information](https://unity.com/legal/do-not-sell-my-personal-information "https://unity.com/legal/do-not-sell-my-personal-information")

[Your Privacy Choices (Cookie Settings)](javascript:void(0); "javascript:void(0);")

---
