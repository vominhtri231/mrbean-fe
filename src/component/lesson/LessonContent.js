import * as React from "react";
import SearchBar from "../common/SearchBar";
import LessonApi from "../../api/LessonApi";
import LessonDataRow from "./LessonDataRow";
import AddIcon from "@material-ui/icons/Add"
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck"
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
import Announce from "../common/Annouce";
import CheckAttendanceForm from "./CheckAttendanceForm";
import LessonAttendanceApi from "../../api/LessonAttendanceApi";

class LessonContent extends React.Component {
  state = {
    lessons: [],
    savedHomeworkStudent: {},
    openAddLessonForm: false,
    selectedLesson: undefined,
    deletingLesson: undefined,
    checkAttendanceLesson: undefined,
    homeworkLessonId: undefined,
    selectedHomework: undefined,
    deletingHomework: undefined,
    doingHomework: undefined,
    endingHomework: undefined,
    watchingHomework: undefined,
    announce: undefined,
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

  handleOpenCheckAttendance = (lesson) => {
    this.setState({checkAttendanceLesson: lesson});
  };

  handleCloseCheckAttendance = () => {
    this.setState({checkAttendanceLesson: undefined});
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

  handleCloseAnnounce = () => {
    this.setState({announce: undefined});
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

  createLesson = (lessonNumber, description, content, homeworkTemplateList) => {
    const {klass} = this.props;
    LessonApi.createLesson(lessonNumber, description, content, klass.id).then(response => {
      const lesson = response.data;
      const {lessons} = this.state;
      const addedLessons = lessons.concat(lesson);
      if (homeworkTemplateList) {
        const today = DateUtils.getCurrentDate();
        homeworkTemplateList.map(homeworkTemplate => {
          this.addHomework(homeworkTemplate.name, today, lesson.id, homeworkTemplate.questions)
          return undefined;
        })
      }
      const successAnnounce = {message: "Create lesson successfully", variant: "success"};
      this.setState({lessons: addedLessons, announce: successAnnounce});
    }).catch(response => {
      const errorAnnounce = {message: "Create lesson fail :" + response.error, variant: "error"};
      this.setState({announce: errorAnnounce})
    })
  };

  editLesson = (lessonNumber, description, content, id) => {
    LessonApi.update(lessonNumber, description, content, id).then(response => {
      const {lessons} = this.state;
      const updatedLesson = lessons.filter(lesson => lesson.id !== id).concat(response.data);
      const successAnnounce = {message: "Update lesson successfully", variant: "success"};
      this.setState({lessons: updatedLesson, announce: successAnnounce});
    }).catch(response => {
      const errorAnnounce = {message: "Update lesson fail :" + response.error, variant: "error"};
      this.setState({announce: errorAnnounce})
    })
  };

  removeFromClass = (lessonId) => {
    LessonApi.delete(lessonId).then(() => {
      const {lessons} = this.state;
      const deletedLessons = lessons.filter(lesson => lesson.id !== lessonId);
      const successAnnounce = {message: "Delete lesson successfully", variant: "success"};
      this.setState({lessons: deletedLessons, announce: successAnnounce})
    }).catch(response => {
      const errorAnnounce = {message: "Delete lesson fail :" + response.error, variant: "error"};
      this.setState({announce: errorAnnounce})
    })
  };

  updateAttendance = (lessonAttendances) => {
    LessonAttendanceApi.update(lessonAttendances).then(() => {
      const successAnnounce = {message: "Save attendance successfully", variant: "success"};
      this.setState({announce: successAnnounce});
    }).catch(response => {
      const errorAnnounce = {message: "Save attendance fail :" + response.error, variant: "error"};
      this.setState({announce: errorAnnounce})
    })
  };

  addHomework = (name, deathLine, lessonId, questions) => {
    HomeworkApi.createHomework(name, deathLine, lessonId, questions).then(response => {
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
      const successAnnounce = {message: "Create homework successfully", variant: "success"};
      this.setState({lessons: addedHomeworkLessons, announce: successAnnounce});
    }).catch(response => {
      const errorAnnounce = {message: "Create homework fail :" + response.error, variant: "error"};
      this.setState({announce: errorAnnounce})
    })
  };

  editHomework = (id, name, deathLine, lessonId, questions) => {
    HomeworkApi.updateHomework(id, name, deathLine, questions).then(response => {
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
      const successAnnounce = {message: "Update homework successfully", variant: "success"};
      this.setState({lessons: updatedHomeworkLessons, announce: successAnnounce});
    }).catch(response => {
      const errorAnnounce = {message: "Update homework fail :" + response.error, variant: "error"};
      this.setState({announce: errorAnnounce})
    })
  };

  deleteHomework = (id) => {
    HomeworkApi.deleteHomework(id).then(() => {
      const {lessons} = this.state;
      const deletedLessons = lessons.map(lesson => {
        const deletedHomeworkList = lesson.homeworkList.filter(homework => homework.id !== id);
        return {...lesson, homeworkList: deletedHomeworkList}
      });
      const successAnnounce = {message: "Delete homework successfully", variant: "success"};
      this.setState({lessons: deletedLessons, announce: successAnnounce});
    }).catch(response => {
      const errorAnnounce = {message: "Delete homework fail :" + response.error, variant: "error"};
      this.setState({announce: errorAnnounce})
    })
  };

  doHomework = (homeworkId, choices) => {
    const {studentId} = this.props;
    HomeworkStudentApi.saveHomeworkStudent(homeworkId, studentId, choices).then(response => {
      const {savedHomeworkStudent} = this.state;
      const addedHomeworkStudent = {...savedHomeworkStudent, [homeworkId]: response.data.choices};
      const successAnnounce = {message: "Save homework successfully", variant: "success"};
      this.setState({savedHomeworkStudent: addedHomeworkStudent, announce: successAnnounce})
    }).catch(response => {
      const errorAnnounce = {message: "Save homework fail :" + response.error, variant: "error"};
      this.setState({announce: errorAnnounce})
    })
  };

  endHomework = (homeworkId) => {
    HomeworkApi.endHomework(homeworkId).then(response => {
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
      const successAnnounce = {message: "End homework successfully", variant: "success"};
      this.setState({lessons: endedLessons, announce: successAnnounce});
    }).catch(response => {
      const errorAnnounce = {message: "End homework fail :" + response.error, variant: "error"};
      this.setState({announce: errorAnnounce})
    })
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
  };

  render() {
    const {mode} = this.props;
    const {announce} = this.state;
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
      {!!announce && <Announce
        message={announce.message} variant={announce.variant}
        onClose={this.handleCloseAnnounce} open
      />}
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
            onCheckAttendance={this.handleOpenCheckAttendance}
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
      endingHomework, watchingHomework, checkAttendanceLesson
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
      {checkAttendanceLesson && <CheckAttendanceForm
        open={!!checkAttendanceLesson}
        handleSubmit={this.updateAttendance}
        handleClose={this.handleCloseCheckAttendance}
        lessonId={checkAttendanceLesson.id}
      />}
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
