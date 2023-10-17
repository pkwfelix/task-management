<template>
    <div class="dragUpload bg-grey-lighten-4 text-center pa-4 mb-6  ">
        <div class="upload">
            <v-row v-if="files.length" class="mb-4">
                <v-col
                v-for="file in files"
                :key="file.id"
                class="d-flex child-flex"
                cols="2"
                >
                    <div class="attachment-thumb">
                        <img v-if="file.thumb" :src="file.thumb" />
                        <span v-else>No Image</span>
                        <caption>{{ file.name }}</caption>
                        <v-btn 
                            size="small"
                            class="btn-close"
                            density="compact" icon="mdi-close"
                            type="button"
                            @click.prevent="remove(file)">
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
            <div>
                <div class="text-center p-5">
                    <h4>Drop files anywhere to upload<br/>or</h4>
                    <file-upload
                        class="btn btn-primary"
                        :multiple="true"
                        :drop="true"
                        :drop-directory="true"
                        v-model="files"
                        @input-filter="inputFilter"
                        @input-file="inputFile"
                        ref="upload">
                        <i class="fa fa-plus"></i>
                        Select files
                    </file-upload>
                </div>
            </div>
    
            <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
                <h3>Drop files to upload</h3>
            </div>
        </div>
    </div>
  </template>

  <script>
  import FileUpload from 'vue-upload-component'
  export default {
    components: {
        FileUpload,
    },
    props: ['existingAttachment'],
    data() {
        return {
            files: this.existingAttachment ? this.existingAttachment : [],
        }
    },
    methods: {
        inputFilter(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
                    return prevent()
                }
                if (/\.(php5?|html?|jsx?)$/i.test(newFile.name) && newFile.type !== "text/directory") {
                return prevent()
                }
            }


            if (newFile && newFile.error === "" && newFile.file && (!oldFile || newFile.file !== oldFile.file)) {
                newFile.blob = ''
                let URL = (window.URL || window.webkitURL)
                if (URL) {
                    newFile.blob = URL.createObjectURL(newFile.file)
                }
                newFile.thumb = ''
                if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
                    newFile.thumb = newFile.blob
                }
            }
        },

        // add, update, remove File Event
        inputFile(newFile, oldFile) {
            if (newFile && oldFile) {
                if (newFile.active && !oldFile.active) {
                if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize && newFile.type !== "text/directory") {
                    this.$refs.upload.update(newFile, { error: 'size' })
                }
                }
                if (newFile.progress !== oldFile.progress) {
                }
                if (newFile.error && !oldFile.error) {
                }
                if (newFile.success && !oldFile.success) {
                }
            }
            if (!newFile && oldFile) {
                if (oldFile.success && oldFile.response.id) {
                }
            }
            if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
                if (this.uploadAuto && !this.$refs.upload.active) {
                this.$refs.upload.active = true
                }
            }
            this.$emit("updateImage", this.files);
        },
        
        remove(file) {
            this.$refs.upload.remove(file)
        }
    }
  }
  </script>

  
<style>
.dragUpload label.btn {
  margin-bottom: 0;
  margin-right: 1rem;
}


.dragUpload .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: .6;
  text-align: center;
  background: #000;
}

.dragUpload .drop-active h3 {
  margin: -.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
.attachment-thumb {
    width:100%;
    border:1px solid #e4e4e4;
    border-radius: 4px;
    position:relative;
    text-align: center;
}
.attachment-thumb img {
    width:100%;
    display: block;
}
.attachment-thumb caption {
    position: absolute;
    font-size: 10px;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.2);
    color: #fff;
    white-space: nowrap;
    padding: 0 2px;
    overflow: hidden;
}
.attachment-thumb .btn-close {
    position: absolute;
    top: -10px;
    right: -10px;
}
</style>