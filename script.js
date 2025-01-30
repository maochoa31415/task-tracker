(() => {
  const KEY_ENTER = 'Enter'
  const descriptionForm = document.querySelector('.task-description-container')

  function addTask() {
    const descriptionEl = descriptionForm.elements['description']
    const description = descriptionEl.value

    if (!!description.trim()) {
      taskTracker.addTask(description)
      descriptionEl.value = ''
    }
  }

  window.taskTracker = new TaskTracker('.task-tracker')
  window.addEventListener('load', function() {
    descriptionForm.addEventListener('submit', function(event) {
      event.preventDefault()
      addTask()
    }, false)
  })
})()
