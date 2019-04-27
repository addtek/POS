import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User} from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getDashboard() {
        return this.http.get<any>(`${environment.apiUrl}/load/dashboard`);
    }
    getAllUsers() {
        return this.http.get<any>(`${environment.apiUrl}/load/users`);
    }

    getStock() {
        return this.http.get<any>(`${environment.apiUrl}/load/stock`);
    }

    getAllCategory() {
        return this.http.get<any>(`${environment.apiUrl}/load/categories`);
    }
    loadSalesRecord(startDate, endDate) {
        return this.http.get<Array<any>>(`${environment.apiUrl}/load/sales/history`, {params: {from: startDate, to: endDate}});
    }
    addSalesItem(user, item, token: string) {
        return this.http.post<any>(`${environment.apiUrl}/sales/add`, {user: user, token: token, item: item});
    }
    dropSalesItem(user, item, token: string) {
        return this.http.post<any>(`${environment.apiUrl}/sales/drop`, {user: user, token: token, item: item});
    }

    dropStockItem(user, item, token: string) {
        return this.http.post<any>(`${environment.apiUrl}/stock/drop`, {user: user, token: token, item: item});
    }
    addItemToStock(data, user, token) {
        return this.http.post<any>(`${environment.apiUrl}/stock/add`, {data: data, user: user, token: token});
    }
    updateStock(user, token: string, data) {
        return this.http.post<any>(`${environment.apiUrl}/stock/update`, {user: user, token: token, item: data});
    }
    getByHallAffilatiation(id: string, role: string) {
        return this.http.get<User[]>(`${environment.apiUrl}/load/students/hall`, {params : {id: id, role: role}});
    }
    getByDepartmentFaculty(department: string, role: string) {
        return this.http.get<User[]>(`${environment.apiUrl}/load/students/department/faculty`,
        {params : {department: department, role: role}});
    }
    filterStudents(filter: string, filterBy: string, department: string, role: string) {
        return this.http.get<User[]>(`${environment.apiUrl}/load/students/filter`,
        {params : {filter: filter, by: filterBy, department: department, role: role}});
    }
    register(userData: Array<any>) {
        return this.http.post(`${environment.apiUrl}/admin/register`, userData);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/update`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
    getDepartmentsAndRoles() {
        return this.http.get(`${environment.apiUrl}/load/departments-roles`);
    }
    clearStudent(id: String, role: String, type) {
        return this.http.post(`${environment.apiUrl}/student/clear`, {stu_id: id, role: role, status: type });
    }
    clearStudentMulti(data: Array<string>, role: String, type) {
        return this.http.post(`${environment.apiUrl}/student/clear-multiple`, {stu_id: data, role: role, status: type });
    }
    block(id) {
        return this.http.put(`${environment.apiUrl}/users/account/activation`, { id: id });
    }
    alertStudentMulti(data: Array<string>) {
        return this.http.post(`${environment.apiUrl}/admin/notify`, {std_id: data });
    }
    checkClearance(index: string) {
        return this.http.post(`${environment.apiUrl}/get/student/clearance`, { id: index });
    }
}
