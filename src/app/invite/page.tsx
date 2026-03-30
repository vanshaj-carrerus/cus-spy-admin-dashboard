"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import {
  Users,
  Building2,
  MapPin,
  Plus,
  Save,
  Send,
  ChevronDown,
  Loader2,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InvitePage() {
  const [activeTab, setActiveTab] = useState("members");

  // Member Form State
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [managerId, setManagerId] = useState("");
  const [role, setRole] = useState("sales");
  const [departmentId, setDepartmentId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  // Fetched Data
  const [departments, setDepartments] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);

  // Add Department State
  const [showAddDepartment, setShowAddDepartment] = useState(false);
  const [newDeptName, setNewDeptName] = useState("");
  const [newDeptDesc, setNewDeptDesc] = useState("");
  const [addingDept, setAddingDept] = useState(false);

  // Add Location State
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [newLocName, setNewLocName] = useState("");
  const [newLocAddress, setNewLocAddress] = useState("");
  const [addingLoc, setAddingLoc] = useState(false);

  useEffect(() => {
    fetchDepartments();
    fetchLocations();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await fetch("/api/departments");
      const data = await res.json();
      if (res.ok) setDepartments(data.departments);
    } catch (err) {
      console.error("Failed to fetch departments", err);
    }
  };

  const fetchLocations = async () => {
    try {
      const res = await fetch("/api/locations");
      const data = await res.json();
      if (res.ok) setLocations(data.locations);
    } catch (err) {
      console.error("Failed to fetch locations", err);
    }
  };

  const handleSendInvite = async () => {
    if (!email) {
      setStatusMessage({ type: "error", text: "Email is required" });
      return;
    }

    try {
      setLoading(true);
      setStatusMessage({ type: "", text: "" });
      const res = await fetch("/api/auth/invite/send-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, role, managerId, departmentId, locationId, contactNumber }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send invite");

      setStatusMessage({ type: "success", text: "Invite sent successfully!" });
      setEmail(""); setName(""); setManagerId(""); setRole("sales"); setDepartmentId(""); setLocationId(""); setContactNumber("");

      setTimeout(() => setStatusMessage({ type: "", text: "" }), 5000);
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleAddDepartment = async () => {
    if (!newDeptName) {
      setStatusMessage({ type: "error", text: "Department name is required" });
      return;
    }
    try {
      setAddingDept(true);
      const res = await fetch("/api/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newDeptName, description: newDeptDesc }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setNewDeptName("");
      setNewDeptDesc("");
      setShowAddDepartment(false);
      fetchDepartments();
      setStatusMessage({ type: "success", text: "Department added successfully!" });
      setTimeout(() => setStatusMessage({ type: "", text: "" }), 4000);
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message });
      setTimeout(() => setStatusMessage({ type: "", text: "" }), 4000);
    } finally {
      setAddingDept(false);
    }
  };

  const handleAddLocation = async () => {
    if (!newLocName) {
      setStatusMessage({ type: "error", text: "Location name is required" });
      return;
    }
    try {
      setAddingLoc(true);
      const res = await fetch("/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newLocName, address: newLocAddress }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setNewLocName("");
      setNewLocAddress("");
      setShowAddLocation(false);
      fetchLocations();
      setStatusMessage({ type: "success", text: "Location added successfully!" });
      setTimeout(() => setStatusMessage({ type: "", text: "" }), 4000);
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message });
      setTimeout(() => setStatusMessage({ type: "", text: "" }), 4000);
    } finally {
      setAddingLoc(false);
    }
  };

  const tabs = [
    { id: "members", label: "Members", icon: Users },
    { id: "departments", label: "Departments", icon: Building2 },
    { id: "location", label: "Location", icon: MapPin },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        title="My Team"
        description="Manage your team members, departments, and locations from this page."
      />

      <div className="p-10 flex flex-col gap-8 max-w-6xl mx-auto w-full">
        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-100 pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 pb-4 px-2 transition-all relative font-semibold text-sm ${activeTab === tab.id
                ? "text-indigo-600"
                : "text-gray-400 hover:text-gray-600"
                }`}
            >
              <tab.icon className="w-4.5 h-4.5" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-active"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {statusMessage.text && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl text-sm font-semibold shadow-sm ${statusMessage.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
            {statusMessage.text}
          </motion.div>
        )}

        {/* Content Card */}
        <AnimatePresence mode="wait">
          {/* MEMBERS TAB */}
          {activeTab === "members" && (
            <motion.div
              key="members"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100 overflow-hidden"
            >
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Add Member</h3>
                  <p className="text-sm text-gray-500 mt-1">Enter the email address of the members to add them to your organization</p>
                </div>
              </div>

              <div className="p-8 space-y-8">
                {/* Email Address Section */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700">Email address</label>
                  <div className="relative group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter the email address of the member here"
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white focus:border-indigo-400 transition-all placeholder:text-gray-400 shadow-sm"
                    />
                  </div>
                </div>

                {/* Grid Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  {/* Name */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-700">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter the name of the member here"
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white focus:border-indigo-400 transition-all shadow-sm"
                    />
                  </div>

                  {/* Manager */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-700">Manager</label>
                    <div className="relative">
                      <select
                        value={managerId}
                        onChange={(e) => setManagerId(e.target.value)}
                        className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white focus:border-indigo-400 transition-all shadow-sm appearance-none cursor-pointer text-gray-700"
                      >
                        <option value="">Select manager</option>
                        {/* Manager list would go here */}
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Role */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-700">Role</label>
                    <div className="relative">
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white focus:border-indigo-400 transition-all shadow-sm appearance-none cursor-pointer text-gray-700"
                      >
                        <option value="sales">Sales</option>
                        <option value="marketing">Marketing</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Department */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-700">Department</label>
                    <div className="relative">
                      <select
                        value={departmentId}
                        onChange={(e) => setDepartmentId(e.target.value)}
                        className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white focus:border-indigo-400 transition-all shadow-sm appearance-none cursor-pointer text-gray-700"
                      >
                        <option value="">Select department</option>
                        {departments.map(dept => (
                          <option key={dept._id} value={dept._id}>{dept.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Base Location */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-700">Base Location</label>
                    <div className="relative">
                      <select
                        value={locationId}
                        onChange={(e) => setLocationId(e.target.value)}
                        className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white focus:border-indigo-400 transition-all shadow-sm appearance-none cursor-pointer text-gray-700"
                      >
                        <option value="">Select location</option>
                        {locations.map(loc => (
                          <option key={loc._id} value={loc._id}>{loc.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Contact Number */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-700">Contact Number</label>
                    <input
                      type="text"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      placeholder="Enter the contact number of the member here"
                      className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white focus:border-indigo-400 transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Form Actions (Secondary) */}
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    className="px-6 py-2.5 rounded-xl font-bold text-sm text-indigo-600 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 transition-all"
                    onClick={() => {
                      setEmail(""); setName(""); setManagerId(""); setRole("sales"); setDepartmentId(""); setLocationId(""); setContactNumber("");
                    }}
                  >
                    Discard
                  </button>
                </div>
              </div>

              <div className="bg-gray-50/50 p-6 flex items-center justify-between">
                <button className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:underline">
                  <Plus className="w-4 h-4" />
                  Add New Member
                </button>
                <div className="flex gap-4">
                  <button
                    className="px-8 py-2.5 rounded-xl font-bold text-sm text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendInvite}
                    disabled={loading}
                    className={`px-8 py-2.5 rounded-xl font-bold text-sm text-white shadow-lg shadow-indigo-200 transition-all flex items-center gap-2 group ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>
                      Send Invite
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-indigo-100" />
                    </>}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* DEPARTMENTS TAB */}
          {activeTab === "departments" && (
            <motion.div
              key="departments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100 overflow-hidden"
            >
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Departments</h3>
                  <p className="text-sm text-gray-500 mt-1">Manage and create departments for your organization</p>
                </div>
                {!showAddDepartment && (
                  <button
                    onClick={() => setShowAddDepartment(true)}
                    className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-indigo-600 shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Department
                  </button>
                )}
              </div>

              {/* Add Department Form */}
              <AnimatePresence>
                {showAddDepartment && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-b border-gray-100 bg-gray-50/30 overflow-hidden"
                  >
                    <div className="p-8 space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">New Department Details</h4>
                        <button onClick={() => setShowAddDepartment(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-sm font-bold text-gray-700">Department Name</label>
                          <input
                            type="text"
                            value={newDeptName}
                            onChange={(e) => setNewDeptName(e.target.value)}
                            placeholder="Engineering, Marketing, etc."
                            className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all shadow-sm"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-bold text-gray-700">Description</label>
                          <input
                            type="text"
                            value={newDeptDesc}
                            onChange={(e) => setNewDeptDesc(e.target.value)}
                            placeholder="Optional description"
                            className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          onClick={() => { setShowAddDepartment(false); setNewDeptName(""); setNewDeptDesc(""); }}
                          className="px-6 py-2.5 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-100 transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddDepartment}
                          disabled={addingDept || !newDeptName}
                          className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-indigo-600 shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                          {addingDept ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                          Save Department
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Departments List */}
              <div className="p-8">
                {departments.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h4 className="text-gray-900 font-bold mb-1">No Departments Found</h4>
                    <p className="text-gray-500 text-sm">Add a department to organize your team.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {departments.map((dept) => (
                      <div key={dept._id} className="p-5 border border-gray-100 rounded-2xl hover:border-indigo-100 hover:shadow-md hover:shadow-indigo-50 transition-all bg-white group">
                        <div className="flex items-start justify-between">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                            <Building2 className="w-5 h-5" />
                          </div>
                        </div>
                        <h4 className="font-bold text-gray-900">{dept.name}</h4>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{dept.description || "No description provided."}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* LOCATIONS TAB */}
          {activeTab === "location" && (
            <motion.div
              key="location"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100 overflow-hidden"
            >
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Locations</h3>
                  <p className="text-sm text-gray-500 mt-1">Manage and create office locations for your team</p>
                </div>
                {!showAddLocation && (
                  <button
                    onClick={() => setShowAddLocation(true)}
                    className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-indigo-600 shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Location
                  </button>
                )}
              </div>

              {/* Add Location Form */}
              <AnimatePresence>
                {showAddLocation && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-b border-gray-100 bg-gray-50/30 overflow-hidden"
                  >
                    <div className="p-8 space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">New Location Details</h4>
                        <button onClick={() => setShowAddLocation(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-sm font-bold text-gray-700">Location Name</label>
                          <input
                            type="text"
                            value={newLocName}
                            onChange={(e) => setNewLocName(e.target.value)}
                            placeholder="New York HQ, London Office, etc."
                            className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all shadow-sm"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-bold text-gray-700">Address</label>
                          <input
                            type="text"
                            value={newLocAddress}
                            onChange={(e) => setNewLocAddress(e.target.value)}
                            placeholder="Optional full address"
                            className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          onClick={() => { setShowAddLocation(false); setNewLocName(""); setNewLocAddress(""); }}
                          className="px-6 py-2.5 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-100 transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddLocation}
                          disabled={addingLoc || !newLocName}
                          className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-indigo-600 shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                          {addingLoc ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                          Save Location
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Locations List */}
              <div className="p-8">
                {locations.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h4 className="text-gray-900 font-bold mb-1">No Locations Found</h4>
                    <p className="text-gray-500 text-sm">Add a location to organize your team.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {locations.map((loc) => (
                      <div key={loc._id} className="p-5 border border-gray-100 rounded-2xl hover:border-indigo-100 hover:shadow-md hover:shadow-indigo-50 transition-all bg-white group">
                        <div className="flex items-start justify-between">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                            <MapPin className="w-5 h-5" />
                          </div>
                        </div>
                        <h4 className="font-bold text-gray-900">{loc.name}</h4>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{loc.address || "No address provided."}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
