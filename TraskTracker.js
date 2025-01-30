const TASK_LIST_SELECTOR = '.task-list'
const FIELD_DESCRIPTION = '\{\{ description \}\}'
const TASK_TEMPLATE = `
  <input class="task-status" type="checkbox" />
  <span class="task-description">${FIELD_DESCRIPTION}</span>
  <button class="btn-remove-task" type="button" title="Remove task">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor">
          <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" />
      </svg>
  </button>
`

class TaskTracker {
  _taskList = []
  _taskListTrackerEl = null
  _taskListEl = null

  /**
   * @param {string} taskContainer Valid css selector that contain the main markup
   */
  constructor(taskContainer) {
    if (taskContainer) {
      this._taskListTrackerEl = document.querySelector(taskContainer)
      this._taskListEl = this._taskListTrackerEl.querySelector(TASK_LIST_SELECTOR)
    }
  }

  get completedTasks() {
    return this._taskList.filter(task => task.status)
  }

  get unCompletedTasks() {
    return this._taskList.filter(task => !task.status)
  }

  #emptyTaskList() {
    // Item by item to avoid memory leaks
    [...this._taskListEl.children].forEach(element => element.remove())
  }

  /**
   * @description Add a new task
   * @param {string} description The task description
   */
  addTask(description) {
    if (typeof description === 'string') {
      this._taskList.unshift({
        description: description,
        status: false,
      })
    }

    this.renderTasks()
  }

  /**
   * @description Remove a task
   * @param {number} index The task index
   */
  removeTask(index) {
    this._taskList.splice(index, 1)
    this.renderTasks()
  }

  /**
   * @description Set the status for a task
   * @param {number} index The task index in list
   * @param {boolean} status The task status
   */
  setTaskStatus(index, status) {
    this._taskList[index].status = status
    this.renderTasks()
  }

  /**
   * @description Render the task list.
   */
  renderTasks() {
    this.#emptyTaskList()
    this._taskList = [...this.unCompletedTasks, ...this.completedTasks ]
    this._taskList.forEach((task, index) => {
      const taskEl = document.createElement('div')

      taskEl.innerHTML = TASK_TEMPLATE.replace(FIELD_DESCRIPTION, task.description)
      taskEl.classList.add('task')

      if (task.status) {
        taskEl.classList.add('completed')
        taskEl.querySelector('.task-status').checked = true
      }

      // Remove button
      taskEl.querySelector('.btn-remove-task').addEventListener('click', () => {
        this.removeTask(index)
      }, false)
      // Status setter
      taskEl.querySelector('.task-status').addEventListener('change', event => {
        this.setTaskStatus(index, event.target.checked)
      }, false)
      this._taskListEl.append(taskEl)
    })
  }
}
