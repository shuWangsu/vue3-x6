import BaseVueNode from "./BaseVueNode";
import { createApp, ref, h } from "vue";
import VueNode from "./VueNode.vue";

class VueHtmlNode extends BaseVueNode.view {
  constructor(props) {
    super(props);
    this.isMounted = false;
    this.r = h(VueNode, {
      properties: props.model.getProperties(),
      text: props.model.inputData,
      onBtnClick: (i) => {
        const { graphModel, model } = props;
        graphModel.eventCenter.emit("vue-node:click", {
          id: "node_123_1",
          val: 10,
        });
        // props.model.setProperties({
        //   style: {
        //     backgroundColor: "rgb(248, 206, 204)",
        //     borderColor: "rgb(184, 84, 80)",
        //     borderWidth: "1px",
        //   },
        // });
        console.log(this, props, "===i===");
        // this.r.component.props.text = String(
        //   Number(this.r.component.props.text) + Number(i)
        // );
      },
    });
    this.app = createApp({
      render: () => this.r,
    });
  }
  setHtml(rootEl) {
    if (!this.isMounted) {
      this.isMounted = true;
      const node = document.createElement("div");
      rootEl.appendChild(node);
      this.app.mount(node);
    } else {
      this.r.component.props.properties = this.props.model.getProperties();
    }
  }
  getText() {
    return null;
  }
}

class VueHtmlNodeModel extends BaseVueNode.model {
  //   setAttributes() {
  //     this.width = 200;
  //     this.height = 40;
  //     this.text.editable = false;
  //     this.inputData = this.text.value;
  //   }
  //   getOutlineStyle() {
  //     const style = super.getOutlineStyle();
  //     style.stroke = "none";
  //     style.hover.stroke = "none";
  //     return style;
  //   }
  //   // getDefaultAnchor() {
  //   //   return [];
  //   // }
  //   getData() {
  //     const data = super.getData();
  //     data.text.value = this.inputData;
  //     return data;
  //   }
}

export default {
  type: "vue-html",
  model: VueHtmlNodeModel,
  view: VueHtmlNode,
};
