import * as React from "react";
import SearchBar from "../common/SearchBar";
import LessonApi from "../../api/LessonApi";
import PaginationTable from "../common/table/PaginationTable";
import LessonDataRow from "./LessonDataRow";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add"
import Fab from "@material-ui/core/Fab";
import AddLessonForm from "./AddLessonForm";
import EditLessonForm from "./EditLessonForm";

class LessonContent extends React.Component {
  state = {
    lessons: [],
    openAddLessonForm: false,
    selectedLesson: undefined
  };

  handleOnAddLesson = () => {
    this.setState({openAddLessonForm: true});
  };

  handleCloseAddForm = () => {
    this.setState({openAddLessonForm: false});
  };

  handleOnEditLesson = (lesson) => {
    this.setState({selectedLesson: lesson})
  };

  handleCloseEditForm = () => {
    this.setState({selectedLesson: undefined})
  };

  search = (keyword) => {
    const {lessons} = this.state;
    const searchedLesson = lessons.map(lesson => {
      lesson.hide = !this.contain(lesson, keyword);
      return lesson
    });
    this.setState({lessons: searchedLesson});
  };

  contain = (lesson, keyword) => {
    const lowerKeyword = keyword.toLowerCase();
    return lesson.lessonNumber.toLowerCase().includes(lowerKeyword)
      || lesson.description.toLowerCase().includes(lowerKeyword);
  };

  createLesson = async (lessonNumber, description) => {
    const {klass} = this.props;
    const {lessons} = this.state;
    const response = await LessonApi.createLesson(lessonNumber, description, klass.id);
    const addedLessons = lessons.concat(response.data);
    this.setState({lessons: addedLessons});
  };

  editLesson = async (lessonNumber, description, id) => {
    const response = await LessonApi.update(lessonNumber, description, id)
    const {lessons} = this.state;
    const updatedLesson = lessons.filter(lesson => lesson.id !== id).concat(response.data);
    this.setState({lessons: updatedLesson});
  };

  removeFromClass = (lessonId) => {
    LessonApi.delete(lessonId).then(() => {
      const {lessons} = this.state;
      const deletedLessons = lessons.filter(lesson => lesson.id !== lessonId);
      this.setState({lessons: deletedLessons})
    });
  };

  async componentDidMount() {
    const {klass} = this.props;
    const response = await LessonApi.getAllOfClass(klass.id);
    this.setState({lessons: response.data});
  }

  render() {
    const {lessons, openAddLessonForm, selectedLesson} = this.state;
    return <div>
      <SearchBar searchPlaceHolder={"Search by lesson number or description "}
                 onSearch={this.search}/>
      <div>
        {this.renderLessons(lessons)}
      </div>
      <Fab
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        color='primary'
        onClick={this.handleOnAddLesson}>
        <AddIcon/>
      </Fab>
      <AddLessonForm
        open={openAddLessonForm}
        handleClose={this.handleCloseAddForm}
        handleSubmit={this.createLesson}
      />
      <EditLessonForm
        open={!!selectedLesson}
        lesson={selectedLesson}
        handleClose={this.handleCloseEditForm}
        handleSubmit={this.editLesson}
      />
    </div>
  }

  renderLessons(lessons) {
    if (lessons.every(lesson => lesson.hide)) {
      return (
        <Typography color="textSecondary" align="center">
          There are no lessons
        </Typography>
      )
    }
    return (
      <PaginationTable
        data={lessons.filter(lesson => !lesson.hide)}
        headers={["Lesson number", "Description", ""]}
        renderRow={lesson =>
          <LessonDataRow
            key={lesson.id}
            data={lesson}
            onDelete={this.removeFromClass}
            onEdit={this.handleOnEditLesson}
          />
        }
      />
    )
  }
}

export default LessonContent;
