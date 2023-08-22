import  { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';


interface Department {
    id: number;
    label: string;
    children: SubDepartment[];
  }
  
  interface SubDepartment {
    id: number;
    label: string;
  }
  

const jsonData = [
  {
    id: 1,
    label: ' Sports',
    children: [
      { id: 11, label: 'Football' },
      { id: 12, label: 'Cricket' },
      { id: 13, label: 'Hocket' },
      { id: 14, label: 'Badminton' },
      { id: 15, label: 'Baseball' },


    ],
  },

];

function DepartmentList() {
 
  const [expanded, setExpanded] = useState<number[]>([]);
  const [selected, setSelected] = useState<number[]>([]); 
  const handleExpand = (id :number) => {
    setExpanded((prevExpanded) =>
      prevExpanded.includes(id)
        ? prevExpanded.filter((deptId) => deptId !== id)
        : [...prevExpanded, id]
    );
  };



  const handleSelectDepartment = (id: number) => {
    setSelected((prevSelected) => {
        const department = jsonData.find((dept) => dept.id === id);
        if (department) {
          const subDeptIds = department.children.map((subDept) => subDept.id);
          const allSubDeptsSelected = subDeptIds.every((subDeptId) => prevSelected.includes(subDeptId));
    
          let newSelected = [...prevSelected];
    
          if (allSubDeptsSelected) {
            // Deselect all sub-departments and the department
            newSelected = prevSelected.filter((deptId) => !subDeptIds.includes(deptId) && deptId !== id);
          } else {
            // Select the department and all sub-departments
            newSelected = [...prevSelected, id, ...subDeptIds];
          }
    
          return newSelected;
        }
    
        return prevSelected;
      });
  };
   




  
  const handleSelectSubDepartment = (id: number) => {
    setSelected((prevSelected) => {
        const newSelected = prevSelected.includes(id)
          ? prevSelected.filter((deptId) => deptId !== id)
          : [...prevSelected, id];
    
        // Find the department that corresponds to the selected sub-department
        const department = jsonData.find((dept) =>
          dept.children.some((subDept) => newSelected.includes(subDept.id))
        );
    
        // If all sub-departments of the department are selected, add the department to selected
        if (department && department.children.every((subDept) => newSelected.includes(subDept.id))) {
          return Array.from(new Set([...newSelected, department.id]));
        }
    
        return newSelected;
      });
  };



  const renderSubDepartments = (subDepartments: SubDepartment[]) => {
    return subDepartments.map((subDept) => (
      <ListItemButton key={subDept.id} onClick={() => handleSelectSubDepartment(subDept.id)}>
        <ListItemIcon>
          <Checkbox
            checked={selected.includes(subDept.id)}
            onClick={(event) => event.stopPropagation()}
            onChange={() => handleSelectSubDepartment(subDept.id)}
          />
        </ListItemIcon>
        <ListItemText primary={subDept.label} />
      </ListItemButton>
    ));
  };





  const renderDepartments = (departments: Department[]) => {
    return departments.map((dept) => (
      <div key={dept.id}>
        <ListItemButton onClick={() => handleExpand(dept.id)}>
          <ListItemIcon>
            {expanded.includes(dept.id) ? <RemoveIcon /> : <AddIcon />}
          </ListItemIcon>
          <ListItemIcon>
            <Checkbox
              checked={selected.includes(dept.id)}
              onClick={(event) => {
                event.stopPropagation();
                handleSelectDepartment(dept.id);
              }}
            />
          </ListItemIcon>
          <ListItemText primary={dept.label} />
        </ListItemButton>
        <Collapse in={expanded.includes(dept.id)} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {renderSubDepartments(dept.children)} {/* Call renderSubDepartments here */}
          </List>
        </Collapse>
      </div>
    ));
  };

  return (
    <List>
      {renderDepartments(jsonData)}
    </List>
  );
}

export default DepartmentList;