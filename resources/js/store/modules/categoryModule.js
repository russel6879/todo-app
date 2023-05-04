import axios from 'axios'

const state = {
  categories: [],
  editCategory: [],



};

const getters = {
  categoryList: state => state.categories,
  editCategory: state => state.editCategory,

};
const actions = {
  async fetchCategories({ commit }) {
    const response = await axios.get("category");
    commit("setCategories", response.data.data)
  },

  async addCategory({ commit }, category) {
    state.loading = true;
    const response = await axios.post("category", category).then(res => {

      Toast.fire({
        icon: "success",
        title: "Successfully Created !!!"
      });

      state.loading = false;

    }).catch(res => {
      Toast.fire({
        icon: "error",
        title: "Please Fill The Form Currectly"
      });
      state.loading = false

    })

    // commit("addNewUnit", response)
  },

  async deleteCategory({ commit }, id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!"
    }).then((result) => { // <--
      if (result.value) { // <-- if confirmed
        axios.delete(`category/${id}`).then(res => {
          Toast.fire({
            icon: "success",
            title: "Successfully Deleted !!!"
          });
        });
        commit("removeCategory", id)

      }
    });

  }
};
const mutations = {
  setCategories: (state, categories) => (
    state.categories = categories

  ),

  addNewCategory: (state, category) => { state.categories.unshift(category) },
  removeCategory: (state, id) => {
    var index = state.categories.findIndex(category => category.id == id);
    state.categories.splice(index, 1)
  }
};
export default {
  state,
  getters,
  actions,
  mutations,
}