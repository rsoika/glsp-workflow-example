# glsp-workflow-example-server

This module contains the server implementation of the glsp-workflow-example. The server implementation is same for every target platform (HTML5, Eclipse Theia, VSCode, Eclipse RCP).

## Building the Workflow Diagram example server

To build the server run 

	$ mvn clean verify -Pm2 -Pfatjar

This will generate a sever jar including your EMF model and all necessary components. This is called a 'fatjar'. 

From the /target/ folder you can now start the server by executing the following commands (whereas X.X.X is the current version):

	$ cd target
	$ java -jar glsp-workflow-example-server-X.X.X-SNAPSHOT-glsp.jar org.eclipse.glsp.example.workflow.launch.ExampleServerLauncher

For the HTML5 client you need to run the server on port 8081

	$ java -jar glsp-workflow-example-server-X.X.X-SNAPSHOT-glsp.jar org.eclipse.glsp.example.workflow.launch.ExampleServerLauncher --port=8081 --websocket

To start the example server from within your IDE, run the main method of the class `WorkflowServerLauncher.java` in the module `org.eclipse.glsp.example.workflow.launch` 

Once the server is running, choose a diagram client integration (such as Eclipse Theia, VSCode, Eclipse, or Standalone).