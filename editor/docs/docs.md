# Using the Sphere.ART Editor


Here are some basics about using the the Sphere.ART editor. If you haven’t seen it in action, you can do so  [here](https://sphereart-editor.netlify.app/ "Sphere.ART Editor").

[![Sphere.ART Editor screen](https://i.ibb.co/DQKjkNr/Screenshot-2021-09-02-at-4-35-36-PM.png)](https://i.ibb.co/DQKjkNr/Screenshot-2021-09-02-at-4-35-36-PM.png)

The interface is pretty straight forward. Starting from the top-left menu, you can import and export scenes or individual models in a variety of formats, clone, add basic geometry, cameras and lights.

Try adding a couple shapes to the scene, then parenting them to the group in the scene graph.


Next down in the top left menu is the play button. If you press it, you’ll probably see a black screen. Press “stop” go back to normal view. This is because there needs to be a scene with some scripting in order for there to be something to play.? Go the the next item “examples” and pick one from the drop down list then press play and see what happens. Press stop and for now lets stick with the “camera” example. We’ll come back to scripted scenes in a bit.

Select any object and notice the object properties appear on the right side. You can also manipulate the objects in different ways through basic settings on the bottom left.

You’ve probably already figured out all of this on your own, but what about making some cool animated scenes like the ones from the drop-down menu? For that, we’ll need to apply scripts to selected objects then publish the scene and optionally load it back in to view it.

### 1. Add objects

File>New>okay

Add two point lights, a sphere and a perspective camera. Position them roughly like the below example

[![Our editor example setup](https://i.ibb.co/z8x89wp/Screenshot-2021-09-02-at-4-29-42-PM.png)](https://i.ibb.co/z8x89wp/Screenshot-2021-09-02-at-4-29-42-PM.png)

### 2. Script

select the perspective camera through the scene graph, click script>edit

[![adding script in the Sphere.ART editor](https://i.ibb.co/zJb2mbq/Screenshot-2021-09-02-at-4-37-21-PM.png)](https://i.ibb.co/zJb2mbq/Screenshot-2021-09-02-at-4-37-21-PM.png)

here is the code to paste in

```
function update( event ) {
   this.rotation.y += 0.1;
}
```

Press play, and you should see something like this. (Sphere spinning while camera rotates around it).

 [![Playing a scene in Sphere.ART editor](https://i.ibb.co/kJXhMXx/Screenshot-2021-09-02-at-4-38-06-PM.png)](https://i.ibb.co/kJXhMXx/Screenshot-2021-09-02-at-4-38-06-PM.png)

### 3. Publish

File>Publish (This exports  a .sphere file which can then be uploaded as an NFT on the Sphere.ART Marketplace)

The .sphere file consists:

-   app.json (the exported data from our scene)
-   thumbnail.png (The thumbnail which would be displayed at the marketplace)
-   preview.webm (The video preview of your Sphere in action)
