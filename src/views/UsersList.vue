<template>
  <div class="main-container">
    <div class="summary-container">
      <div :style="{ display: 'flex' }">User management</div>
      <div :style="{ display: 'flex' }">
        <a-space direction="horizontal" :size="8">
          <a-button class="btn-show" @click="showAllUsers = true"
            >Show All Users</a-button
          >
          <a-button class="btn-add" @click="isAddModalVisible = true"
            >Add a User</a-button
          >
        </a-space>
      </div>
    </div>
    <a-table
      v-if="showAllUsers"
      :columns="columns"
      :data-source="userData"
      :pagination="false"
    >
      <span slot="operations" slot-scope="record">
        <a-space direction="horizontal" :size="8">
          <a-button class="btn-edit" @click="onEdit(record.key)">Edit</a-button>
          <a-button class="btn-delete" @click="onDelete(record.key)"
            >Delete</a-button
          >
        </a-space>
      </span>
    </a-table>
    <a-modal
      title="Edit a user"
      :visible="isEditModalVisible"
      okText="Save Changes"
      cancelText="Close"
      @cancel="onCancelEditModal"
      @ok="onOkEditModal"
    >
      <a-row
        type="flex"
        align="middle"
        :style="{ marginBottom: '8px' }"
        v-if="editedUser"
      >
        <a-col :span="6">Name</a-col>
        <a-col :span="18">
          <div>{{ editedUser.name }}</div>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle" v-if="editedUser">
        <a-col :span="6">Salary</a-col>
        <a-col :span="18">
          <a-input v-model="editedUser.salary" />
        </a-col>
      </a-row>
    </a-modal>
    <a-modal
      title="Add a user"
      :visible="isAddModalVisible"
      cancelText="Close"
      okText="Add"
      @cancel="onCancelAddModal"
      @ok="onOkAddModal"
    >
      <a-space direction="vertical" :size="8" :style="{ width: '100%' }">
        <a-row type="flex" align="middle">
          <a-col :span="6">Name</a-col>
          <a-col :span="18">
            <a-input v-model="addUserForm.name" />
          </a-col>
        </a-row>
        <a-row type="flex" align="middle">
          <a-col :span="6">Company</a-col>
          <a-col :span="18">
            <a-input v-model="addUserForm.company" />
          </a-col>
        </a-row>
        <a-row type="flex" align="middle">
          <a-col :span="6">Salary</a-col>
          <a-col :span="18">
            <a-input v-model="addUserForm.salary" />
          </a-col>
        </a-row>
      </a-space>
    </a-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { deleteUser, updateUser, addUser } from "../api/usersApi";
// import { message } from "ant-design-vue";

const columns = [
  {
    title: "Index",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "IsActive",
    dataIndex: "isActive",
    key: "isActive",
  },
  {
    title: "Salary",
    dataIndex: "salary",
    key: "salary",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Operations",
    key: "operations",
    scopedSlots: { customRender: "operations" },
  },
];

export default {
  name: "UsersList",
  data() {
    return {
      showAllUsers: false,
      columns,
      editedUser: null,
      isEditModalVisible: false,
      isAddModalVisible: false,
      addUserForm: {
        name: "",
        company: "",
        salary: "",
      },
      mockId: "123456",
    };
  },
  methods: {
    ...mapActions(["getUsers"]),
    onEdit(userId) {
      const editedUser = this.users.find((user) => user.id === userId);
      if (editedUser) {
        this.editedUser = { ...editedUser };
        this.isEditModalVisible = true;
      }
    },
    onCancelEditModal() {
      this.isEditModalVisible = false;
    },
    async onOkEditModal() {
      await updateUser({ ...this.editedUser });
      this.getUsers();
      this.isEditModalVisible = false;
    },
    onCancelAddModal() {
      this.isAddModalVisible = false;
    },
    async onOkAddModal() {
      console.log(this.addUserForm);
      await addUser({
        ...this.addUserForm,
        salary: parseFloat(this.addUserForm.salary),
        id: this.mockId,
      });
      this.mockId += 1;
      this.getUsers();
      this.isAddModalVisible = false;
    },
    async onDelete(userId) {
      await deleteUser(userId);
      this.getUsers();
    },
  },
  computed: {
    ...mapGetters(["users"]),
    userData() {
      return this.users.map((user, index) => ({
        key: user.id,
        index: index + 1,
        name: user.name,
        isActive: user.active ? "true" : "false",
        salary: user.salary,
        company: user.company,
      }));
    },
  },
  created() {
    this.getUsers();
  },
};
</script>

<style lang="scss" scoped>
.ant-btn {
  color: white !important;
  outline: none !important;
  border: none !important;
}
.btn-edit {
  background: teal;
  &:hover,
  &:focus {
    background: rgb(5, 90, 90);
  }
}
.btn-delete {
  background: red;
  &:hover,
  &:focus {
    background: rgb(185, 14, 14);
  }
}

.btn-show {
  background: green;
  &:hover,
  &:focus {
    background: rgb(3, 78, 3);
  }
}

.btn-add {
  background: blue;
  &:hover,
  &:focus {
    background: rgb(9, 9, 156);
  }
}

.summary-container {
  border: 1px solid gray;
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.main-container {
  padding: 30px;
}
</style>
