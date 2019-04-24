import * as React from "react";
import SearchBar from "../common/SearchBar";
import LessonApi from "../../api/LessonApi";
import LessonDataRow from "./LessonDataRow";
import AddIcon from "@material-ui/icons/Add"
import Fab from "@material-ui/core/Fab";
import AddLessonForm from "./AddLessonForm";
import EditLessonForm from "./EditLessonForm";
import LessonContentViewer from "./LessonContentViewer";
import Typography from "@material-ui/core/Typography";
import PaginationTable from "../common/table/PaginationTable";

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

  handleOnChooseLesson = (lesson) => {
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
    return lesson.lessonNumber.toString().toLowerCase().includes(lowerKeyword)
      || lesson.description.toLowerCase().includes(lowerKeyword);
  };

  createLesson = async (lessonNumber, description, content) => {
    const {klass} = this.props;
    const {lessons} = this.state;
    const response = await LessonApi.createLesson(lessonNumber, description, content, klass.id);
    const addedLessons = lessons.concat(response.data);
    this.setState({lessons: addedLessons});
  };

  editLesson = async (lessonNumber, description, content, id) => {
    const response = await LessonApi.update(lessonNumber, description, content, id)
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

  async componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.klass) !== JSON.stringify(prevProps.klass)) {
      const klass = this.props.klass;
      const response = await LessonApi.getAllOfClass(klass.id);
      this.setState({lessons: response.data});
    }
  }

  async componentDidMount() {
    const {klass} = this.props;
    const response = await LessonApi.getAllOfClass(klass.id);
    this.setState({lessons: response.data});
  }

  render() {
    const {lessons, openAddLessonForm, selectedLesson} = this.state;
    const {watchMode} = this.props;
    return <div>
      <SearchBar searchPlaceHolder={"Search by lesson number or description "}
                 onSearch={this.search}/>
      <div>
        {this.renderLessons(lessons)}
      </div>
      {(!watchMode) &&
      <>
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
      </>}
      {watchMode ?
        <LessonContentViewer
          open={!!selectedLesson}
          lesson={selectedLesson}
          handleClose={this.handleCloseEditForm}/>
        :
        <EditLessonForm
          open={!!selectedLesson}
          lesson={selectedLesson}
          handleClose={this.handleCloseEditForm}
          handleSubmit={this.editLesson}
        />
      }
    </div>
  }


  renderLessons(lessons) {
    const {watchMode} = this.props;
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
            watchMode={watchMode}
            key={lesson.id}
            data={lesson}
            onChoose={this.handleOnChooseLesson}
            onDelete={this.removeFromClass}
          />
        }
      />
    )
  }
}

export default LessonContent;
