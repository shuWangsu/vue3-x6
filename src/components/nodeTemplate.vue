// components/NodeTemplate.vue
<template>
  <div :class="nodeClass" class="node">
    <img :src="logo" />
    <span class="label">{{ label }}</span>
    <span class="status">
      <img :src="statusImg" v-if="statusImg" />
    </span>
  </div>
</template>

<script>
export default {
  inject: ["getGraph", "getNode"],
  data() {
    return {
      status: "",
      label: "",
      statusImg: "",
      logo: "",
    };
  },

  methods: {
    mapper(source, target) {
      for (let key in target) {
        target[key] = source?.[key] ?? target[key];
      }
    },
  },

  created() {
    let node = this.getNode();
    // 初始化数据绑定
    this.mapper(node.data, this.$data);
    console.info(node);
    // 节点数据变化监听，从而绑定数据
    node.on("change:data", ({ current }) => this.mapper(current, this.$data));
  },

  computed: {
    nodeClass: function () {
      let clazz = {};
      if (this.status) clazz[this.status] = true;
      return clazz;
    },
  },
};
</script>
