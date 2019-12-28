<template>
  <div class="prepare">
    <div class="card shadow-sm">
      <div class="card-header">Prepare Notice</div>
      <div class="card-body">
        <ckeditor
          :editor="editor.type"
          v-model="editor.data"
          :config="editor.config"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "Prepare",
  components: {
    ckeditor: CKEditor.component
  },
  data() {
    return {
      editor: {
        type: ClassicEditor,
        data: null,
        config: {
          // The configuration of the editor.
        }
      }
    };
  }
};
</script>
