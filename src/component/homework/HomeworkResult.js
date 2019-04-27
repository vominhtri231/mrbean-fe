import * as React from "react";
import {IconButton, TextField} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close"
import HomeworkStudentApi from "../../api/HomeworkStudentApi";
import PaginationTable from "../common/table/PaginationTable";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Chip from "@material-ui/core/Chip";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import LineChart from "../common/chart/LineChart";

class HomeworkResult extends React.Component {
  state = {
    homeworkStudents: [],
    tab: 0
  };

  handleTabChange = (e, value) => {
    this.setState({tab: value})
  };

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.homework) !== JSON.stringify(prevProps.homework)
      && !!this.props.homework) {
      this.init(this.props.homework.id)
    }
  }

  async init(homeworkId) {
    const response = await HomeworkStudentApi.getHomeworkStudentOfHomework(homeworkId);
    const homeworkStudents = response.data;
    const {homework} = this.props;
    const convertedHomeworkStudent = homeworkStudents.map(homeworkStudent => {
      homeworkStudent.completion = this.getCompletion(homeworkStudent.choices, homework);
      return homeworkStudent
    });
    this.setState({homeworkStudents: convertedHomeworkStudent, tab: 0});
  }

  render() {
    const {homeworkStudents, tab} = this.state;
    const {open, handleClose, homework} = this.props;
    if (!homework) return <></>;
    const name = homework.name;
    const deathLine = homework.deathLine;

    return <Dialog
      open={open}
      onClose={handleClose}
      fullScreen
    >
      <DialogTitle style={{backgroundColor: '#b7b38d', padding: '5px 20px 5px 20px'}}>
        <TextField value={name}
                   label={"Homework name"}
                   InputProps={{
                     readOnly: true,
                   }}
        />
        <TextField
          style={{marginLeft: 20}}
          label="Death line"
          type="date"
          value={deathLine}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
        />
        <IconButton style={{position: 'absolute', right: 20}} onClick={handleClose}>
          <CloseIcon/>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div style={{marginBottom: 40, marginTop: '30px'}}>
          {tab === 1 && this.renderStudentChoicesSpecificTable(homeworkStudents, homework)}
          {tab === 0 && this.renderStudentSpecificTable(homeworkStudents, homework)}
          {tab === 2 && this.renderSummary(homeworkStudents, homework)}
        </div>
        <BottomNavigation
          style={{
            backgroundColor: '#d9dbdd', position: 'fixed', bottom: 10,
            left: '50%', transform: 'translate(-50%, 0)',
          }}
          value={tab}
          onChange={this.handleTabChange}
          showLabels
        >
          <BottomNavigationAction label="Completion" value={0}/>
          <BottomNavigationAction label="Detail" value={1}/>
          <BottomNavigationAction label="Summary" value={2}/>
        </BottomNavigation>
      </DialogContent>
    </Dialog>
  }

  renderStudentSpecificTable = (homeworkStudents) => {
    return <PaginationTable
      data={homeworkStudents}
      headers={["Student", "Email", "Complete", "Accuracy"]}
      renderRow={homeworkStudent =>
        <TableRow key={homeworkStudent.student.email}>
          <TableCell> {homeworkStudent.student.name}</TableCell>
          <TableCell> {homeworkStudent.student.email}</TableCell>
          <TableCell> {homeworkStudent.completion + "%"}</TableCell>
          <TableCell> {homeworkStudent.result + "%"}</TableCell>
        </TableRow>
      }
    />
  };

  renderStudentChoicesSpecificTable = (homeworkStudents, homework) => {
    const questions = homework.questions;
    const headers = ["Student", "Email"].concat(...Array(questions.length).keys())
    return <PaginationTable
      data={homeworkStudents}
      headers={headers}
      renderRow={homeworkStudent => {
        const choices = homeworkStudent.choices;
        return <TableRow key={homeworkStudent.student.email}>
          <TableCell> {homeworkStudent.student.name}</TableCell>
          <TableCell> {homeworkStudent.student.email}</TableCell>
          {questions.map((question, i) => {
            const answer = choices[i];
            const correct = answer === question.correctAnswer;
            const color = !!(answer !== undefined) ? correct ? "primary" : "secondary" : "default";
            return <TableCell><Chip color={color}/></TableCell>
          })}
        </TableRow>
      }}
    />
  };

  renderSummary = (homeworkStudents, homework) => {
    const studentNumber = homeworkStudents.length;
    const sumCompletion = homeworkStudents.reduce((current, homeworkStudent) => current + homeworkStudent.completion, 0);
    const averageCompletion = sumCompletion / studentNumber;
    const sumAccuracy = homeworkStudents.reduce((current, homeworkStudent) => current + homeworkStudent.result, 0);
    const averageAccuracy = sumAccuracy / studentNumber;

    const correctAnswers = homework.questions
      .map((question, i) => {
        return homeworkStudents.reduce((count, homeworkStudent) => {
          const correct = homeworkStudent.choices[i] === question.correctAnswer;
          return count + (correct ? 1 : 0);
        }, 0);
      })
      .concat(0);
    const accuracyRate = correctAnswers.map(correctAnswer => correctAnswer * 100 / studentNumber);

    const workedAnswers = homework.questions
      .map((question, i) => {
        return homeworkStudents.reduce((count, homeworkStudent) => {
          const worked = homeworkStudent.choices[i] !== undefined;
          return count + (worked ? 1 : 0);
        }, 0);
      })
      .concat(0);
    const workedRate = workedAnswers.map(workedAnswer => workedAnswer * 100 / studentNumber);

    console.log(correctAnswers);
    const labels = [...Array(homework.questions.length).keys()].map(num => `Question ${num + 1}`);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Accuracy rate',
          data: accuracyRate,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
          ]
        }, {
          label: 'Complete rate',
          data: workedRate,
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
          ]
        }
      ]
    };
    return <>
      <TextField
        value={averageCompletion + "%"}
        label={"Average completion"}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        style={{marginLeft: 10}}
        value={averageAccuracy + "%"}
        label={"Average accuracy"}
        InputProps={{
          readOnly: true,
        }}
      />
      <LineChart chartData={chartData} legendPosition="bottom" height={120}
                 label={"Result of each question"}/>
    </>
  };

  getCompletion = (choices, homework) => {
    if (!homework.questions || !homework.questions.length) return 0;
    return choices.length * 100 / homework.questions.length;
  }
}

export default HomeworkResult;