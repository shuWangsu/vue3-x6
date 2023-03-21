<template>
  <component
    :is="tableLayoutTag"
    class="table-layout"
    :class="{
      'table-layout--default': !plain,
      'table-layout--plain': plain,
      'table-layout--outline': outline,
    }"
  >
    <slot name="header" v-bind="this"></slot>

    <isc-header
      v-if="hasOperator"
      class="table-layout__operator pa0 d-flex align-center mb8 flex-wrap"
      :style="{ height: headerHeight }"
    >
      <div class="d-flex align-center flex-wrap">
        <slot name="operator-left" v-bind="this"></slot>
      </div>

      <flex-spacer></flex-spacer>

      <div class="d-flex align-center flex-wrap">
        <slot name="operator-right" v-bind="this"></slot>
      </div>
    </isc-header>

    <component
      :is="flexContainerTag"
      class="table-layout__content"
      :scrollbar="false"
      inner-flex
    >
      <slot name="table" v-bind="this">
        
      </slot>

      <isc-footer
        v-if="footer"
        class="table-layout__footer d-flex align-center px16 fz12"
        height="50px"
      >
        <slot name="footer-left" v-bind="this">共 {{ total }} 项</slot>

        <flex-spacer></flex-spacer>

        <slot v-if="!intact" name="footer-right">
          每页显示
          <isc-pagination
            small
            :page-size.sync="params.pageSize"
            :current-page.sync="params.pageNum"
            :total="total"
            :page-sizes="pageSizeArr"
            layout="sizes, prev, pager, next"
            @size-change="onPageSizChange"
            @current-change="onPageNumChange"
          ></isc-pagination>
        </slot>
      </isc-footer>
    </component>

    <slot v-bind="this"></slot>
  </component>
</template>



<style lang="scss" scoped>
.table-layout {
  &__content {
    background-color: #fff;
  }

  &__main {
    position: relative;
    height: 100%;
  }

  &__footer {
    line-height: 1;
    color: #666;
    border-top: 1px #ddd solid;
  }

  &--default {
    position: relative;
  }

  &--default &__content {
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    border-radius: 2px;
  }

  &--plain &__main {
    border-bottom: 0;
  }

  &--outline &__content {
    border: 1px solid #ddd;
  }
}
</style>
