<p align="center">

# Vue.js sleepy-components

##### This is a project containing some of useful components I wrote before for vue.js.
This project means to only have the basic function for each components. I have collected some useful pieces from other projects and simplified it. Feel free to copy it to your project and modify it as you wish. I hope these code can make your life easier.


[Changelog](https://github.com/hangekinobaka/sleepy-components/releases)

<p align="center">
  <img src="./src/assets/my-comp.gif">
</p>

### Components List
* ImageClickable
> An image compnent with a preview that fits its outer box and a zoom window inside which the user can move and zoom in-and-out the image.
* Slide
> A simlple slider layout, go from left to right.
* Tab
> A simlple tab layout with the basic switch function  
* Modal
> A simlple modal with the basic show and hide ( remove ) function. This is a plugin, can use it both statically or dynamically.
  

### Project setup
This setup is for storybook and you can test the components here.

```bash
npm install
```

### Start
```bash
npm run storybook
```

### Examples

#### Tab

I'll take `Tab` as an example for normal components.
First of all, you need to set up your Vue.js correctly.
  
```javascript
import TabLayout from "@component";
import Tab from "@component";
/* 
as we export the components in the src\components\index.js, it is not necessary to specify the comp path
*/

/*
The comps like Tab stores an array of itselves inside the TabLayout, 
thus they have to be used together.
*/
```

```vue
<tab-layout>
  <tab label="tab1">this is tab 1</tab>
  <tab label="tab2" :selected="true">this is tab 2</tab>
  <tab label="tab3">this is tab 3</tab>
</tab-layout>
```  

#### Modal 
  
I'll take `Modal` as an example for plugin components.
For this Modal component, it can be used as both dynamic conponent or static conponent.

##### install plugin
Please install your plugin at your vue's `index.js` file, or something similar.   
in this project, as we use storybook, I installed the plugin at `.storybook\config.js`. Check it if you want. ^_<
```javascript
// --- Plugins
import Modal from "@plugin/Modal";

// Use plugins
Vue.use(Modal);
```   
   
##### static usage
```vue
<template>
<div>
  <modal name="myModal" :delay=300>
    <div>
      <h1>Static Modal</h1>
      <p>Some text from props: {{text}}</p>
    </div>
  </modal>

  <button @click="showStaticModal">Show</button>
</div>
</template>
<script>
import Modal from "@component";

export default {
  name: "test",
  components: {Modal},
  data() {
    return {
      text: "Hmmmm" 
    };
  },
  methods: {
    showStaticModal() {
      this.$modal.show("myModal");
    }
  }
};
</script>
```  
Remember you use `this.$modal` to interact with your modal component, rather than modify it directly. Call `this.$modal.show(modalName)`, whereas `modalName` is a string to use static modal.     
   
   
##### dynamic usage
```vue
<template>
<div>
  <button @click="showDynamicRuntimeModal">Show</button>
</div>
</template>
<script>
// no need to import anything here

export default {
  name: "test",
 
  methods: {
    showDynamicRuntimeModal() {
      this.$modal.show(
        {
          template: `
            <div>
              <h1>Dynamic Modal</h1>
              <p>Some text from props: {{text}}</p>
            </div>
          `,
          props: ["text"]
        },
        { text: "HAHAHAHHA" },
        { buffer: false }
      );
    }
  }
};
</script>
```  
Call `this.$modal.show()` with an object or function to use dynamic modal.