import { GRADES } from "./const";

export function getGradeById(id: number) {
  for (let i = 0; i < GRADES.length; i++) {
    for (let j = 0; j < GRADES[i].subItem.length; j++) {
      if (GRADES[i].subItem[j].id === id) {
        return GRADES[i].subItem[j];
      }
    }
  }
}
