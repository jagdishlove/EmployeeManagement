import makeRequest, { addRequest } from "../api/api";

async function fetchTable(table) {
  return await makeRequest("GET", `/api/masterData/${table}`);
}

async function createItem(table, data) {
  return await makeRequest("POST", `/api/masterData/${table}`, data);
}

async function updateItem(table, id, data) {
  return await makeRequest("PUT", `/api/masterData/${table}/${id}`, data);
}

async function deleteItem(table, id) {
  return await makeRequest("DELETE", `/api/masterData/${table}/${id}`);
}

export const masterDataService = {
  async getAllMasterData() {
    const [
      skills, bands, designations, jobTypes, domains,
      officeLocations, holidays, clients, onsiteLocations,
      employeeTypes, leaveTypes,
    ] = await Promise.all([
      fetchTable("skills"),
      fetchTable("bands"),
      fetchTable("designations"),
      fetchTable("job_types"),
      fetchTable("domains"),
      fetchTable("office_locations"),
      fetchTable("holidays"),
      fetchTable("clients"),
      fetchTable("client_onsite_locations"),
      fetchTable("employee_types"),
      fetchTable("leave_types"),
    ]);

    return {
      skill: skills || [],
      band: bands || [],
      designation: designations || [],
      jobType: jobTypes || [],
      domain: domains || [],
      officeLocation: officeLocations || [],
      holiday: holidays || [],
      client: clients || [],
      clientLocation: onsiteLocations || [],
      employeeType: employeeTypes || [],
      leaveType: leaveTypes || [],
    };
  },

  async getSkills() { return await fetchTable("skills"); },
  async createSkill(skill) { return await createItem("skills", skill); },
  async updateSkill(id, skill) { return await updateItem("skills", id, skill); },
  async deleteSkill(id) { return await deleteItem("skills", id); },

  async getBands() { return await fetchTable("bands"); },
  async createBand(band) { return await createItem("bands", band); },
  async updateBand(id, band) { return await updateItem("bands", id, band); },
  async deleteBand(id) { return await deleteItem("bands", id); },

  async getDesignations() { return await fetchTable("designations"); },
  async createDesignation(designation) { return await createItem("designations", designation); },
  async updateDesignation(id, designation) { return await updateItem("designations", id, designation); },
  async deleteDesignation(id) { return await deleteItem("designations", id); },

  async getJobTypes() { return await fetchTable("job_types"); },
  async createJobType(jobType) { return await createItem("job_types", jobType); },
  async deleteJobType(id) { return await deleteItem("job_types", id); },

  async getDomains() { return await fetchTable("domains"); },
  async createDomain(domain) { return await createItem("domains", domain); },
  async deleteDomain(id) { return await deleteItem("domains", id); },

  async getOfficeLocations() { return await fetchTable("office_locations"); },
  async createOfficeLocation(location) { return await createItem("office_locations", location); },
  async updateOfficeLocation(id, location) { return await updateItem("office_locations", id, location); },
  async deleteOfficeLocation(id) { return await deleteItem("office_locations", id); },

  async getHolidays() { return await fetchTable("holidays"); },
  async createHoliday(holiday) { return await createItem("holidays", holiday); },
  async deleteHoliday(id) { return await deleteItem("holidays", id); },

  async getClients() { return await fetchTable("clients"); },
  async createClient(client) { return await createItem("clients", client); },
  async updateClient(id, client) { return await updateItem("clients", id, client); },
  async deleteClient(id) { return await deleteItem("clients", id); },

  async getClientOnsiteLocations() { return await fetchTable("client_onsite_locations"); },
  async createClientOnsiteLocation(location) { return await createItem("client_onsite_locations", location); },
};

export default masterDataService;
