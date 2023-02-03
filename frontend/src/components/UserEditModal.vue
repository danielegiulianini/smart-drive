<template>
  <!--this is the modal used by the app (no header, title and footer)-->
  <a
    class="icon"
    href="#"
    data-bs-toggle="modal"
    data-bs-target="#editUserModal"
    ><i class="bi bi-pencil"></i
  ></a>
  <!-- Modal -->
  <teleport to="body">
    <div
      class="modal fade"
      id="editUserModal"
      tabindex="-1"
      aria-labelledby="editUserModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <!--<div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>-->
          <div class="modal-body">
            <UserEditForm :initialUser="initialUser"></UserEditForm>
          </div>
          <!--<div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>-->
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import UserEditForm from "./UserEditForm.vue";

export default {
  components: { UserEditForm },
  props: {
    initialUser: {
      type: Object,
    },
  },
};
</script>

<style scoped></style>
