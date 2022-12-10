<template>
  <div
    class="alert alert-danger alert-dismissible fade show my-0"
    role="alert"
    v-if="invalidImageMessage"
  >
    {{ invalidImageMessage }}
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
  <div
    class="alert alert-success alert-dismissible fade show my-0"
    v-if="imageSuccessfullyUploaded"
    role="alert"
  >
    Image successfully uploaded!
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
  <div
    class="uploader mb-1 mt-1"
    @dragenter="OnDragEnter"
    @dragleave="OnDragLeave"
    @dragover.prevent
    @drop="onDrop"
    :class="{ dragging: isDragging }"
  >
    <div class="upload-control" v-show="image">
      <!--<label for="file">Select a file</label>-->
      <button @click="upload">Upload</button>
      <button @click="deleteImg">Delete</button>
    </div>

    <div v-show="!image">
      <i class="fa fa-cloud-upload"></i>
      <p>Drag your images here</p>
      <div>OR</div>
      <div class="file-input">
        <label for="file">Select a file</label>
        <input type="file" id="file" @change="onInputChange" />
      </div>
    </div>

    <div class="images-preview justify-content-center" v-show="image">
      <div class="img-wrapper" v-if="image">
        <img :src="image" />
        <div class="details">
          <span class="name" v-if="file" v-text="file.name"></span>
          <span class="size" v-if="file" v-text="getFileSize(file.size)"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//TODO: make it impossible to add more than one image
import { getFileSize } from "../utils/File.js";

export default {
  props: {
    initialImage: {
      type: String, // Number from 0.0 to 1.0
    },
  },
  data: function () {
    return {
      isDragging: false,
      invalidImageMessage: "",
      imageSuccessfullyUploaded: false,
      dragCount: 0,
      file: "",
      image: this.initialImage,
      fileInputValue: "",
    };
  },
  methods: {
    OnDragEnter(e) {
      e.preventDefault();

      this.dragCount++;
      this.isDragging = true;
      return false;
    },
    OnDragLeave(e) {
      e.preventDefault();
      this.dragCount--;
      if (this.dragCount <= 0) this.isDragging = false;
    },
    onInputChange(e) {
      console.log("onInputChange");
      const files = e.target.files;
      //throw error if more than one image
      if (files.length > 0) this.addImage(files[0]);
    },
    onDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      this.isDragging = false;
      const files = e.dataTransfer.files;
      if (files.length > 0) this.addImage(files[0]);
    },
    //this is a preview
    addImage(file) {
      console.log("addImage");

      if (!file.type.match("image.*")) {
        console.log(`${file.name} is not an image`);
        return;
      }
      this.file = file; //const img = new Image();
      const reader = new FileReader();
      reader.onload = (e) => (this.image = e.target.result);
      reader.readAsDataURL(file);
    },
    getFileSize(size) {
      getFileSize(size);
    },
    upload() {
      const formData = new FormData();

      formData.append("images[]", file, file.name);

      const imageUrl = URL.createObjectURL(this.files[0]);

      //axios (this can be here or in parent component)
      axios.post("/images-upload", formData).then((response) => {
        //display an alert
        console.log("All images uplaoded successfully");
        /* no remove
        this.images = [];
        this.files = [];*/
        imageSuccessfullyUploaded = true;
        // Emit FormData & image URL to the parent component
        this.$emit("image-uploaded", { formData, imageUrl });
      });
    },
    deleteImg() {
      console.log("deleteImage");
      //should be using refs
      document.querySelector("#file").value = ""; //this needed for avoiding that in chrome two consecutive same files don't trigger onchange
      //remove img
      //remove from form-data
      this.images.pop();
      console.log("now images are ", this.image);
      this.files.pop();
      console.log("now files are ", this.file);
    },
  },
  emits: ["image-uploaded"],
};
</script>

<style lang="scss" scoped>
.uploader {
  width: 100%;
  background: #2196f3;
  color: #fff;
  padding: 40px 15px;
  text-align: center;
  border-radius: 10px;
  border: 3px dashed #fff;
  font-size: 20px;
  position: relative;
  &.dragging {
    background: #fff;
    color: #2196f3;
    border: 3px dashed #2196f3;
    .file-input label {
      background: #2196f3;
      color: #fff;
    }
  }
  i {
    font-size: 85px;
  }
  .file-input {
    width: 200px;
    margin: auto;
    height: 68px;
    position: relative;
    label,
    input {
      background: #fff;
      color: #2196f3;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      padding: 10px;
      border-radius: 4px;
      margin-top: 7px;
      cursor: pointer;
    }
    input {
      opacity: 0;
      z-index: -2;
    }
  }
  .images-preview {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    .img-wrapper {
      width: 160px;
      display: flex;
      flex-direction: column;
      margin: 10px;
      height: 150px;
      justify-content: space-between;
      background: #fff;
      box-shadow: 5px 5px 20px #3e3737;
      img {
        object-fit: contain;
        max-height: 105px;
      }
    }
    .details {
      font-size: 12px;
      background: #fff;
      color: #000;
      display: flex;
      flex-direction: column;
      align-items: self-start;
      padding: 3px 6px;
      .name {
        overflow: hidden;
        height: 18px;
      }
    }
  }
  .upload-control {
    position: absolute;
    width: 100%;
    background: #fff;
    top: 0;
    left: 0;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    padding: 10px;
    padding-bottom: 4px;
    text-align: right;
    button,
    label {
      background: #2196f3;
      border: 2px solid #03a9f4;
      border-radius: 3px;
      color: #fff;
      font-size: 15px;
      cursor: pointer;
    }
    label {
      padding: 2px 5px;
      margin-right: 10px;
    }
  }
}
</style>
