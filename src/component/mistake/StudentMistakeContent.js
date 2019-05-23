import * as React from "react";
import SearchBar from "../common/SearchBar";
import PaginationTable from "../common/table/PaginationTable";
import Typography from "@material-ui/core/Typography";
import MistakeApi from "../../api/MistakeApi";
import StudentMistakeDataRow from "./StudentMistakeDataRow";

class StudentMistakeContent extends React.Component {
  state = {
    mistakes: [],
  };

  search = (keyword) => {
    const {mistakes} = this.state;
    const searchedMistake = mistakes.map(mistake => {
      mistake.hide = !this.contain(mistake, keyword);
      return mistake
    });
    this.setState({mistakeTypes: searchedMistake});
  };

  contain = (mistake, keyword) => {
    const lowerKeyword = keyword.toLowerCase();
    return mistake.lesson.lessonNumber.toString().toLowerCase().includes(lowerKeyword)
      || mistake.lesson.description.toLowerCase().includes(lowerKeyword)
      || mistake.student.email.toLowerCase().includes(lowerKeyword)
      || mistake.mistakeType.name.toLowerCase().includes(lowerKeyword);
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
    const response = await MistakeApi.getAllOfKlassAndStudent(klass.id, studentId);
    const mistakes = response.data;
    this.setState({mistakes});
  };

  render() {
    return <div>
      <SearchBar searchPlaceHolder={"Search by lesson's number,lesson's description,mistake type or student'email"}
                 onSearch={this.search}
                 onReload={this.init}/>
      <div>
        {this.renderMistakes()}
      </div>
    </div>
  }

  renderMistakes() {
    const {mistakes} = this.state;
    if (mistakes.every(mistake => mistake.hide)) {
      return (
        <Typography color="textSecondary" align="center">
          There are no mistakes
        </Typography>
      )
    }
    return (
      <PaginationTable
        data={mistakes.filter(lesson => !lesson.hide)}
        headers={["Lesson number", "Lesson description", "MistakeType"]}
        renderRow={lesson =>
          <StudentMistakeDataRow
            key={lesson.id}
            data={lesson}
          />
        }
      />
    )
  }
}

export default StudentMistakeContent;
