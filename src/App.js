import {Component} from 'react'
import './App.css'
import {v4 as uuidv4} from 'uuid'

import TagItem from './components/TagItem'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    tasksList: [],
    inputTask: '',
    inputTag: tagsList[0].displayText,
    selectedTag: '',
  }

  onClickAddTask = () => {
    const {inputTask, inputTag} = this.state
    if (inputTask !== '') {
      const newTaskItem = {
        task: inputTask,
        tag: inputTag,
        id: uuidv4(),
      }
      this.setState(pre => ({
        tasksList: [...pre.tasksList, newTaskItem],
        inputTask: '',
        inputTag: tagsList[0].displayText,
      }))
    }
  }

  onChangeTask = event => {
    this.setState({inputTask: event.target.value})
  }

  onChangeTag = event => {
    const t = tagsList.filter(each => each.optionId === event.target.value)
    this.setState({inputTag: t[0].displayText})
  }

  onClickSelectTag = text => {
    this.setState({
      selectedTag: text,
    })
  }

  render() {
    const {tasksList, inputTask, inputTag, selectedTag} = this.state
    console.log(inputTag)
    const selectedTasksList = tasksList.filter(each =>
      each.tag.includes(selectedTag),
    )

    return (
      <div className="bg-container">
        <div className="section1">
          <h1 className="section1-h">Create a task!</h1>
          <form className="section1-form">
            <label htmlFor="taskInput" className="section1-lable">
              Task
            </label>
            <input
              type="text"
              id="taskInput"
              className="section1-input"
              placeholder="Enter the task here"
              value={inputTask}
              onChange={this.onChangeTask}
            />

            <label htmlFor="tagsInput" className="section1-lable">
              Tags
            </label>
            <select
              id="tagsInput"
              className="section1-input"
              value={inputTag}
              onChange={this.onChangeTag}
            >
              {tagsList.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="section1-btn"
              onClick={this.onClickAddTask}
            >
              Add Task
            </button>
          </form>
        </div>

        <div className="section2">
          <h1 className="section2-h">Tags</h1>
          <ul className="section2-tags-container">
            {tagsList.map(each => (
              <TagItem
                key={each.optionId}
                tagItemDetails={each}
                onClickSelectTag={this.onClickSelectTag}
              />
            ))}
          </ul>
          <h1 className="section2-h">Tasks</h1>
          {selectedTasksList.length === 0 ? (
            <p className="section2-no-tasks">No Tasks Added Yet</p>
          ) : (
            <ul className="section2-tasks-container">
              {selectedTasksList.map(each => (
                <li className="section2-tasks-li" key={each.id}>
                  <p className="section2-tasks-li-h">{each.task}</p>
                  <p className="section2-tasks-li-p">{each.tag}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
