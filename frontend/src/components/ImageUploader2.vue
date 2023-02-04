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
    @dragenter.prevent="OnDragEnter"
    @dragleave.prevent="OnDragLeave"
    @dragover.prevent
    @drop="onDrop"
    :class="{ dragging: isDragging }"
  >
    <div class="upload-control" v-show="image">
      <!--<label for="file">Select a file</label>-->
      <!--<button @click.prevent="upload" v-if="!(initialImage == image)">
        Upload
      </button>-->
      <!--<button @click.prevent="deleteImg">Delete</button>-->
      <button @click.prevent="deleteImg">
        <i class="bi bi-trash3-fill" style="font-size: 100%"></i>
      </button>
      <button
        class="ms-1"
        @click.prevent="upload"
        v-if="!(initialImage == image)"
      >
        <i class="bi bi-upload" style="font-size: 100%"></i>
      </button>
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
      <div class="img-wrapper justify-content-center" v-if="image">
        <img :src="image" />
        <div class="details" v-if="file">
          <span class="name" v-if="file" v-text="file.name"></span>
          <span class="size" v-if="file" v-text="getFileSize(file.size)"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFileSize } from "../utils/File.js";
import axios from "axios";

export default {
  props: {
    initialImage: {
      type: String,
    },
  },
  data() {
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
      this.dragCount++;
      this.isDragging = true;
      return false;
    },
    OnDragLeave(e) {
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
    validateImage(file) {
      let valid = true;
      if (!file.type.match("image.*")) {
        this.invalidImageMessage = `${file.name} is not an image`;
        valid = false;
      }
      const maxImageSizeInMiB = 1.5;
      if (file.size / 1024 / 1024 > maxImageSizeInMiB){// in MiB){
        this.invalidImageMessage = `Image is too big, max size is 2 MiB`;
        valid = false;
      }
      return valid;
    },
    addImage(file) {
      this.imageSuccessfullyUploaded = false;
      if (this.validateImage(file)) {
        this.file = file;
        const reader = new FileReader();
        reader.onload = (e) => (this.image = e.target.result);
        reader.readAsDataURL(file);
      }
    },
    getFileSize(size) {
      getFileSize(size);
    },
    upload() {
      //upload only if not the default image!
      const formData = new FormData();
      console.log("this file is", this.file);
      console.log("the image is", this.image);

      if (this.file) {
        formData.append("imageToUpload", this.file, this.file.name);
        const imageUrl = URL.createObjectURL(this.file);
        console.log("successful upload");
        //this.imageSuccessfullyUploaded = true;

        //axios (this can be here or in parent component)
        axios
          .post("/images", formData)
          .then((response) => {
            //        axios.post("/images-upload", formData).then((response) => {

            //display an alert
            console.log("All images uplaoded successfully");
            /* no remove
        this.images = [];
        this.files = [];*/
            this.imageSuccessfullyUploaded = true;
            // Emit FormData & image URL to the parent component
            console.log("la response is:", response);
            const imageUrl = response.data;
            this.$emit("imageUploaded", { formData, imageUrl });
          })
          .catch((err) => {
            //more user-friendly message here?
            this.invalidImageMessage = err;
            console.error(err);
          });
      } else {
        console.log(
          "not uploading image as it is the default as no one is selected"
        );
      }
    },
    deleteImg() {
      console.log("deleteImage");
      //if image was already uploaded must delete it from servers
      console.log("imageSuccessfullyUploaded?", this.imageSuccessfullyUploaded);
      if (this.imageSuccessfullyUploaded) {
        console.log("deleting image from server!");
        this.$emit("imageRemoved");
      }
      console.log("after if!");
      //should be using refs
      document.querySelector("#file").value = ""; //this needed for avoiding that in chrome two consecutive same files don't trigger onchange
      //remove img
      //remove from form-data
      this.image = "";
      console.log("now images are ", this.image);
      this.file = "";
      console.log("now files are ", this.file);
    },
  },
  emits: ["imageUploaded", "imageRemoved"],
  watch: {
    //watcher for user edit
    initialImage: function (value) {
      console.log("tttttttttttttttttttchaning image");
      //here the prop
      this.image = value;
    },
  },
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
