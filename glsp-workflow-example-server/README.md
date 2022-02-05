# glsp-workflow-example-client

This module contains the server implementation

## Building the Workflow Diagram example server

In the root of this repository, run

	$ mvn clean verify -Pm2 -Pfatjar

In the folder examples/org.eclipse.glsp.example.workflow/target, you should have a jar file org.eclipse.glsp.example.workflow-X.X.X-SNAPSHOT-glsp.jar whereas X.X.X is the current version. You can now start the server by executing the following commands:

	$ cd target
	$ java -jar org.eclipse.glsp.example.workflow-X.X.X-SNAPSHOT-glsp.jar org.eclipse.glsp.example.workflow.launch.ExampleServerLauncher

To start the example server from within your IDE, run the main method of the class ExampleServerLauncher.java in the module glsp-server/examples/org.eclipse.glsp.example.workflow.

Once the server is running, choose a diagram client integration (such as Eclipse Theia, VSCode, Eclipse, or Standalone) below.