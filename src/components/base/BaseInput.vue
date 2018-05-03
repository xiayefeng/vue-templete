<template>
   <div class="wrap">
     <input class="search-input" type="text" v-model.trim.lazy="inputVal" :placeholder="placeholder" :maxlength="len" @keyup.enter="search" @focus="inputFocus">
     <i v-show="inputVal.length" @click.stop="clearInput" class="el-icon-circle-close clear-btn"></i>
     <span class="search-box" @click.stop="search"><i class="el-icon-search"></i></span>
   </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    inputVal: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入查询内容'
    },
    len: {
      type: Number,
      default: 12
    }
  },
  methods: {
    inputFocus (e) {
      e.target.select()
    },
    search () {
      this.$emit('searchData', {val: this.inputVal})
    },
    clearInput () {
      this.inputVal = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/mixin.scss";

.wrap {
  display: inline-block;
  @extend %left;
  @extend %rel;

  .search-input {
    height: 38px;
    line-height: 38px;
    width: 180px;
    border: 1px solid #dcdfe6;
    padding: 0 5px;
    @include radius(4px);
  }
  .clear-btn {
    @extend %abs;
    right: 35px;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #ccc;
    cursor: pointer;
  }
  .search-box {
    display: inline-block;
    width: 38px;
    height: 38px;
    cursor: pointer;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-left: 1px solid #dcdfe6;
    @extend %abs;
    right: -20px;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #ccc;

    &:hover {
      color: #f90;
    }
  }
}
</style>
