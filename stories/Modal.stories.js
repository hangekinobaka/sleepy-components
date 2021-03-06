import { storiesOf } from "@storybook/vue";
import { Modal } from "@component";

storiesOf("Modal", module)
  .add("Dynamic", () => ({
    template: `
    <button @click="showDynamicRuntimeModal">Show</button>
  `,
    methods: {
      showDynamicRuntimeModal() {
        this.$modal.show(
          {
            template: `
          <div class="modal-box">
            <div class="modal-body">
              <h1>Dynamic Modal</h1>
              <p>Some text from props: {{text}}</p>
            </div>
          </div>
        `,
            props: ["text"]
          },
          { text: "HAHAHAHHA" },
          { buffer: false }
        );
      }
    }
  }))
  .add("Static", () => ({
    components: { Modal },
    template: `
    <div>
      <modal name="myModal" :delay=300>
        <div class="modal-box">
          <div class="modal-body">
            <h1>Static Modal</h1>
            <p>Some text from props: {{text}}</p>
          </div>
        </div>
      </modal>

      <button @click="showStaticModal">Show</button>
    </div>
    `,
    data: () => ({ text: "Hmmmm" }),
    methods: {
      showStaticModal() {
        this.$modal.show("myModal");
      }
    }
  }))
  .add("With Close Button", () => ({
    components: { Modal },
    template: `
    <div>
      <modal name="myModal" :clickToClose="false">
        <div class="modal-box">
          <div class="modal-body">
            <h1>Are you sure?</h1>
            <button @click="closeStaticModal">Yes</button>
            <button @click="closeStaticModal">Canccel</button>   
          </div>
        </div>   
      </modal>

      <button @click="showStaticModal">Show</button>
    </div>
    `,
    methods: {
      showStaticModal() {
        this.$modal.show("myModal");
      },
      closeStaticModal() {
        this.$modal.close("myModal");
      }
    }
  }))
  .add("Change Modal Parent", () => ({
    computed: {
      modalParent() {
        return document.getElementById("target");
      }
    },
    template: `
      <app-wrapper :style= "{background:'#fff'}">
        <app-body :style="{background:'#eee'}" id="target">My App's Main Content</app-body>
        <app-footer :style="{background:'tomato'}">
          <p>My App's Footer</p>
          <button @click="showDynamicRuntimeModal">Show</button>
        </app-footer>
      </app-wrapper>
    `,
    methods: {
      showDynamicRuntimeModal() {
        this.$modal.show(
          {
            template: ` 
            <div class="modal-box">
              <div class="modal-body">
                <h1>Dynamic Modal</h1>
                <p>Some text from props: {{text}}</p>
              </div>
            </div>`,
            props: ["text"]
          },
          { text: "HAHAHAHHA" },
          {
            name: "myModal",
            parent: this.modalParent,
            buffer: false,
            closeOnBackgroundClick: true
          }
        );
      }
    }
  }));
