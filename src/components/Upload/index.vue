<template>
  <div class="upload-container" :style="{width: width + 'px', height: height + 'px'}">
    <el-upload
      :disabled="disabled"
      :data="{type}"
      :headers="headers"
      :multiple="false"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :on-success="handleImageSuccess"
      class="image-uploader"
      drag
      :action="action"
    >
      <template v-if="!imageUrl">
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
        </div>
      </template>
      <div v-else class="image-preview">
        <div v-show="imageUrl.length>1" class="image-preview-wrapper">
          <img :src="imageUrl">
          <div class="image-preview-action">
            <!-- <i class="el-icon-zoom-in" @click.stop.prevent="onPreview" /> -->
            <i v-if="!disabled" class="el-icon-delete" @click.stop.prevent="rmImage" />
          </div>
        </div>
      </div>
    </el-upload>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Common } from '@/api/const'
export default {
    name: 'SingleImageUpload',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: 200
        },
        height: {
            type: Number,
            default: 200
        },
        value: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            action: process.env.VUE_APP_BASE_API + Common.upload
        }
    },
    computed: {
        ...mapGetters(['token', 'language']),
        imageUrl() {
            return this.value
        },
        headers() {
            return {
                token: this.token,
                language: this.language
            }
        }
    },
    methods: {
        rmImage() {
            this.emitInput('')
        },
        emitInput(val) {
            this.$emit('input', val)
        },
        handleImageSuccess({ data }) {
            console.log(data.link)
            this.emitInput(data.link)
        },
        beforeUpload() {
            if (!this.token) return Promise.reject('请先登陆后再上传图片')
            return true
        },
        onPreview() {
            console.log(this.imageUrl)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "~@/styles/mixin.scss";
    .upload-container {
      font-size: 0;
      height: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;
        @include clearfix;
        >>> .el-upload {
          width: 100%;
          height: 100%;
        }
        >>> .el-upload-dragger {
          background-color: transparent !important;
          width: 100% !important;
          height: 100% !important;
        }
        .image-uploader {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
        }
        .image-preview {
          position: relative;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            .image-preview-wrapper {
                position: relative;
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .image-preview-action {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                cursor: default;
                text-align: center;
                color: #fff;
                opacity: 0;
                font-size: 20px;
                background-color: rgba(0, 0, 0, .5);
                transition: opacity .3s;
                cursor: pointer;
                text-align: center;
                line-height: 200px;
                .el-icon-zoom-in,
                .el-icon-delete {
                    font-size: 36px;
                }
            }
            &:hover {
                .image-preview-action {
                    opacity: 1;
                }
            }
        }
    }
</style>
