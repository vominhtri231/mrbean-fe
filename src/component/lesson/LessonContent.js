import * as React from "react";
import SearchBar from "../common/SearchBar";
import LessonApi from "../../api/LessonApi";
import LessonDataRow from "./LessonDataRow";
import AddIcon from "@material-ui/icons/Add"
import Fab from "@material-ui/core/Fab";
import AddLessonForm from "./AddLessonForm";
import EditLessonForm from "./EditLessonForm";
import LessonContentViewer from "./LessonContentViewer";
import HomeworkInput from "../homework/HomeworkInput";
import HomeworkApi from "../../api/HomeworkApi";
import ConfirmDialog from "../common/ConfirmDialog";
import PaginationTable from "../common/table/PaginationTable";
import Typography from "@material-ui/core/Typography";
import HomeworkWorksheet from "../homework/HomeworkWorksheet";
import HomeworkStudentApi from "../../api/HomeworkStudentApi";
import HomeworkResult from "../homework/HomeworkResult";
import appConstants from "../../util/appConstants";
import HomeworkSpec from "../homework/HomeworkSpec";
import HomeworkWorksheetResult from "../homework/HomeworkWorksheetResult";
import DateUtils from "../../util/DateUtils";

class LessonContent extends React.Component {
  state = {
    lessons: [],
    savedHomeworkStudent: {},
    openAddLessonForm: false,
    selectedLesson: undefined,
    deletingLesson: undefined,
    homeworkLessonId: undefined,
    selectedHomework: undefined,
    deletingHomework: undefined,
    doingHomework: undefined,
    endingHomework: undefined,
    watchingHomework: undefined,
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

  handleDeleteLesson = (lesson) => {
    this.setState({deletingLesson: lesson})
  };

  handleCloseDeleteLesson = () => {
    this.setState({deletingLesson: undefined})
  };

  handleOpenAddHomeworkForm = (lessonId) => {
    this.setState({
      homeworkLessonId: lessonId, selectedHomework: undefined
    })
  };

  handleOpenEditHomeworkForm = (lessonId, selectedHomework) => {
    this.setState({
      homeworkLessonId: lessonId, selectedHomework: selectedHomework
    })
  };

  handleCloseHomeworkForm = () => {
    this.setState({
      homeworkLessonId: undefined, selectedHomework: undefined
    })
  };

  handleOpenDeleteHomeworkDialog = (lesson) => {
    this.setState({
      deletingHomework: lesson
    })
  };

  handleCloseDeleteHomeworkDialog = () => {
    this.setState({
      deletingHomework: undefined
    })
  };

  handleOpenDoHomeworkDialog = (homework) => {
    this.setState({doingHomework: homework})
  };

  handleCloseDoHomeworkDialog = () => {
    this.setState({doingHomework: undefined})
  };

  handleOpenEndHomeworkDialog = (homework) => {
    this.setState({endingHomework: homework})
  };

  handleCloseEndHomeworkDialog = () => {
    this.setState({endingHomework: undefined})
  };

  handleOpenWatchingResultHomeworkDialog = (homework) => {
    this.setState({watchingHomework: homework})
  };

  handleCloseWatchingResultHomeDialog = () => {
    this.setState({watchingHomework: undefined})
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

  createLesson = async (lessonNumber, description, content, homeworkTemplateList) => {
    const {klass} = this.props;
    const {lessons} = this.state;
    const response = await LessonApi.createLesson(lessonNumber, description, content, klass.id);
    const lesson = response.data;
    const addedLessons = lessons.concat(lesson);
    if (homeworkTemplateList) {
      const today = DateUtils.getCurrentDate();
      homeworkTemplateList.map(homeworkTemplate => {
        this.addHomework(homeworkTemplate.name, today, lesson.id, homeworkTemplate.questions)
      })
    }
    this.setState({lessons: addedLessons});
  };

  editLesson = async (lessonNumber, description, content, id) => {
    const response = await LessonApi.update(lessonNumber, description, content, id);
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

  addHomework = async (name, deathLine, lessonId, questions) => {
    const response = await HomeworkApi.createHomework(name, deathLine, lessonId, questions);
    const addingHomework = response.data;
    const {lessons} = this.state;

    const addingHomeworkLesson = lessons.filter(lesson => lesson.id === lessonId)[0];
    const originHomeworkList = addingHomeworkLesson.homeworkList;
    const addedHomeworkList = !!originHomeworkList ? originHomeworkList.concat(addingHomework) : [addingHomework];
    const addedHomeworkLesson = {...addingHomeworkLesson, homeworkList: addedHomeworkList};

    const addedHomeworkLessons = lessons.map(lesson => {
      if (lesson.id === lessonId) {
        return addedHomeworkLesson;
      }
      return lesson;
    });
    this.setState({lessons: addedHomeworkLessons});
  };

  editHomework = async (id, name, deathLine, lessonId, questions) => {
    const response = await HomeworkApi.updateHomework(id, name, deathLine, questions);
    const updatingHomework = response.data;
    const {lessons} = this.state;

    const updatingHomeworkLesson = lessons.filter(lesson => lesson.id === lessonId)[0];
    const originHomeworkList = updatingHomeworkLesson.homeworkList;
    const updatedHomeworkList = originHomeworkList
      .filter(homework => homework.id !== id)
      .concat(updatingHomework);
    const updatedHomeworkLesson = {...updatingHomeworkLesson, homeworkList: updatedHomeworkList};

    const updatedHomeworkLessons = lessons.map(lesson => {
      if (lesson.id === lessonId) {
        return updatedHomeworkLesson;
      }
      return lesson;
    });
    this.setState({lessons: updatedHomeworkLessons});
  };

  deleteHomework = async (id) => {
    await HomeworkApi.deleteHomework(id);
    const {lessons} = this.state;
    const deletedLessons = lessons.map(lesson => {
      const deletedHomeworkList = lesson.homeworkList.filter(homework => homework.id !== id);
      return {...lesson, homeworkList: deletedHomeworkList}
    });
    this.setState({lessons: deletedLessons});
  };

  doHomework = async (homeworkId, choices) => {
    const {studentId} = this.props;
    const {savedHomeworkStudent} = this.state;
    const response = await HomeworkStudentApi.saveHomeworkStudent(homeworkId, studentId, choices);
    const addedHomeworkStudent = {...savedHomeworkStudent, [homeworkId]: response.data.choices};
    this.setState({savedHomeworkStudent: addedHomeworkStudent})
  };

  endHomework = async (homeworkId) => {
    const response = await HomeworkApi.endHomework(homeworkId);
    const endedHomework = response.data;
    const {lessons} = this.state;
    const endedLessons = lessons.map(lesson => {
      const endedHomeworkList = lesson.homeworkList
        .map(homework => {
          if (homework.id === endedHomework.id) {
            return endedHomework;
          }
          return homework;
        });
      return {...lesson, homeworkList: endedHomeworkList}
    });
    this.setState({lessons: endedLessons});
  };

  getHomeworkStudents = async (homeworkIds, studentId) => {
    const responses = await Promise.all(
      homeworkIds.map(homeworkId => HomeworkStudentApi.getHomeworkStudent(homeworkId, studentId)));
    const savedHomeworkStudent = responses
      .map(response => response.data)
      .filter(homeworkStudent => !!homeworkStudent.homework)
      .reduce((savingHomeworkStudent, homeworkStudent) => {
        savingHomeworkStudent[homeworkStudent.homework.id] = homeworkStudent.choices;
        return savingHomeworkStudent;
      }, {});
    this.setState({savedHomeworkStudent})
  };

  async componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.klass) !== JSON.stringify(prevProps.klass)) {
      await this.init()
    }
  }

  async componentDidMount() {
    await this.init()
  }

  init = async () => {
    const {klass, studentId} = this.props;
    const response = await LessonApi.getAllOfClass(klass.id);
    const lessons = response.data;
    this.setState({lessons});

    if (studentId) {
      const homeworkIdsOfLessons = lessons
        .map(lesson => {
          return lesson.homeworkList.map(homework => homework.id)
        })
        .reduce((homeworkIds, homeworkIdsOfLessons) => homeworkIdsOfLessons.concat(homeworkIds), []);
      await this.getHomeworkStudents(homeworkIdsOfLessons, studentId)
    }
  }

  render() {
    const {mode} = this.props;
    return <div>
      <SearchBar searchPlaceHolder={"Search by lesson number or description "}
                 onSearch={this.search}
                 onReload={this.init}/>
      <div>
        {this.renderLessons()}
      </div>
      {mode === appConstants.modes.Student ?
        this.renderStudentModeGadgets() :
        mode === appConstants.modes.Teacher ?
          this.renderTeacherModeGadgets() :
          this.renderAdminModeGadgets()
      }
    </div>
  }

  renderLessons() {
    const {mode} = this.props;
    const {lessons} = this.state;
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
        headers={["Lesson number", "Description", "Homework", ""]}
        renderRow={lesson =>
          <LessonDataRow
            mode={mode}
            key={lesson.id}
            data={lesson}
            onChoose={this.handleOnChooseLesson}
            onDelete={this.handleDeleteLesson}
            addHomework={this.handleOpenAddHomeworkForm}
            deleteHomework={this.handleOpenDeleteHomeworkDialog}
            editHomework={this.handleOpenEditHomeworkForm}
            doHomework={this.handleOpenDoHomeworkDialog}
            watchHomework={this.handleOpenWatchingResultHomeworkDialog}
          />
        }
      />
    )
  }

  renderStudentModeGadgets() {
    const {selectedLesson, doingHomework, savedHomeworkStudent, watchingHomework} = this.state;
    return <>
      <LessonContentViewer
        open={!!selectedLesson}
        lesson={selectedLesson}
        handleClose={this.handleCloseEditForm}/>
      {!!watchingHomework && <HomeworkWorksheetResult
        open={!!watchingHomework}
        homework={watchingHomework}
        choices={savedHomeworkStudent[watchingHomework.id]}
        handleClose={this.handleCloseWatchingResultHomeDialog}
      />}
      {!!doingHomework && <HomeworkWorksheet
        open={!!doingHomework}
        homework={doingHomework}
        choices={savedHomeworkStudent[doingHomework.id]}
        handleSubmit={this.doHomework}
        handleClose={this.handleCloseDoHomeworkDialog}
      />}
    </>
  }

  renderTeacherModeGadgets() {
    const {
      openAddLessonForm, selectedLesson, homeworkLessonId,
      selectedHomework, deletingHomework, deletingLesson,
      endingHomework, watchingHomework
    } = this.state;
    return <>
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
      <HomeworkInput
        open={!!homeworkLessonId}
        lessonId={homeworkLessonId}
        homework={selectedHomework}
        addHomework={this.addHomework}
        editHomework={this.editHomework}
        endHomework={this.handleOpenEndHomeworkDialog}
        handleClose={this.handleCloseHomeworkForm}
      />
      <HomeworkResult
        open={!!watchingHomework}
        homework={watchingHomework}
        handleClose={this.handleCloseWatchingResultHomeDialog}
      />
      {!!deletingHomework && <ConfirmDialog
        open={!!deletingHomework}
        title={`Do you want to delete homework with name : ${deletingHomework.name}`}
        handleSubmit={() => this.deleteHomework(deletingHomework.id)}
        handleClose={this.handleCloseDeleteHomeworkDialog}
      />}
      {!!deletingLesson && <ConfirmDialog
        open={!!deletingLesson}
        title={`Do you want to delete lesson with lesson number : ${deletingLesson.lessonNumber}
                and description : ${deletingLesson.description} `}
        handleSubmit={() => this.removeFromClass(deletingLesson.id)}
        handleClose={this.handleCloseDeleteLesson}
      />}
      {!!endingHomework && <ConfirmDialog
        open={!!endingHomework}
        title={`Do you want to end homework with name : ${endingHomework.name}`}
        handleSubmit={() => this.endHomework(endingHomework.id)}
        handleClose={this.handleCloseEndHomeworkDialog}
      />}
    </>
  }

  renderAdminModeGadgets() {
    const {selectedLesson, selectedHomework, watchingHomework} = this.state;
    return <>
      <LessonContentViewer
        open={!!selectedLesson}
        lesson={selectedLesson}
        handleClose={this.handleCloseEditForm}/>
      {!!selectedHomework && <HomeworkSpec
        open={!!selectedHomework}
        homework={selectedHomework}
        handleClose={this.handleCloseHomeworkForm}
      />}
      <HomeworkResult
        open={!!watchingHomework}
        homework={watchingHomework}
        handleClose={this.handleCloseWatchingResultHomeDialog}
      />
    </>
  }
}

export default LessonContent;
