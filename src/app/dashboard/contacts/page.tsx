'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Phone, Edit2, Trash2, Download, ChevronLeft, ChevronRight } from 'lucide-react';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  isActive: boolean;
}

interface CreateContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
}

const ITEMS_PER_PAGE = 10;

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [exporting, setExporting] = useState(false);
  const [formData, setFormData] = useState<CreateContactForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
  });

  useEffect(() => {
    fetchContacts();
    setCurrentPage(1); // Reset to page 1 when search term changes
  }, [searchTerm]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/contacts?search=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error('Failed to fetch contacts');
      const data = await response.json();
      setContacts(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load contacts');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = async () => {
    try {
      setExporting(true);
      const userRole = localStorage.getItem('userRole');
      
      const response = await fetch('/api/export/contacts', {
        headers: {
          'x-user-id': localStorage.getItem('userId') || '',
          'x-user-role': userRole || '',
          'x-user-email': localStorage.getItem('userEmail') || '',
          'x-user-name': localStorage.getItem('userName') || '',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to export contacts');
      }

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `contacts-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to export contacts');
    } finally {
      setExporting(false);
    }
  };

  const handleCreateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': localStorage.getItem('userId') || '',
          'x-user-role': localStorage.getItem('userRole') || '',
          'x-user-email': localStorage.getItem('userEmail') || '',
          'x-user-name': localStorage.getItem('userName') || '',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create contact');
      }

      setShowCreateForm(false);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', jobTitle: '' });
      fetchContacts();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create contact');
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'x-user-id': localStorage.getItem('userId') || '',
          'x-user-role': localStorage.getItem('userRole') || '',
          'x-user-email': localStorage.getItem('userEmail') || '',
          'x-user-name': localStorage.getItem('userName') || '',
        },
      });
      if (!response.ok) throw new Error('Failed to delete');
      fetchContacts();
    } catch (err) {
      alert('Failed to delete contact');
    }
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedContacts = filteredContacts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen p-8" style={{background: 'linear-gradient(135deg, #0a0e27 0%, #1a0f3f 50%, #0a0e27 100%)'}}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-cyan-300 mb-2" style={{textShadow: '0 0 20px rgba(0, 212, 255, 0.6)'}}>
              CONTACTS
            </h1>
            <p className="text-cyan-300/60">Manage all your customer relationships</p>
          </div>
          <button 
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold rounded-lg flex items-center gap-2" style={{boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)'}}>
            <Plus size={20} />
            {showCreateForm ? 'Cancel' : 'Add Contact'}
          </button>
        </div>

        {/* Create Contact Form */}
        {showCreateForm && (
          <div className="p-6 rounded-lg border border-purple-500/50 bg-slate-900/50 backdrop-blur-sm" style={{boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)'}}>
            <h3 className="text-xl font-bold text-purple-300 mb-4">Create New Contact</h3>
            <form onSubmit={handleCreateContact} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                  className="px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required
                  className="px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Company"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
                <input
                  type="text"
                  placeholder="Job Title"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                  className="px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black font-bold rounded-lg"
              >
                Create Contact
              </button>
            </form>
          </div>
        )}

        {/* Search */}
        <div className="p-4 rounded-lg border border-cyan-500/50 bg-slate-900/50 backdrop-blur-sm" style={{boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)'}}>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-300">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-cyan-300">Loading contacts...</div>
          </div>
        )}

        {/* Contacts Table */}
        {!loading && (
          <div className="p-6 rounded-lg border border-pink-500/50 bg-slate-900/50 backdrop-blur-sm overflow-auto" style={{boxShadow: '0 0 20px rgba(255, 0, 127, 0.2)'}}>
            <h2 className="text-2xl font-bold text-pink-300 mb-6 uppercase">Contacts ({filteredContacts.length})</h2>
            {filteredContacts.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                No contacts found. Create your first contact to get started.
              </div>
            ) : (
              <>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-pink-500/50">
                        <th className="px-4 py-3 text-left text-pink-300 font-bold uppercase">Name</th>
                        <th className="px-4 py-3 text-left text-pink-300 font-bold uppercase">Email</th>
                        <th className="px-4 py-3 text-left text-pink-300 font-bold uppercase">Phone</th>
                        <th className="px-4 py-3 text-left text-pink-300 font-bold uppercase">Company</th>
                        <th className="px-4 py-3 text-left text-pink-300 font-bold uppercase">Status</th>
                        <th className="px-4 py-3 text-center text-pink-300 font-bold uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedContacts.map((contact) => (
                        <tr
                          key={contact.id}
                          className="border-b border-cyan-500/20 hover:bg-slate-800/50 transition-colors"
                        >
                          <td className="px-4 py-3 font-semibold text-white">{contact.firstName} {contact.lastName}</td>
                          <td className="px-4 py-3 text-gray-400">{contact.email}</td>
                          <td className="px-4 py-3">
                            {contact.phone ? (
                              <a href={`tel:${contact.phone}`} className="text-cyan-300 hover:text-cyan-200 transition-colors flex items-center gap-1">
                                <Phone size={16} />
                                {contact.phone}
                              </a>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-gray-400">{contact.company || '-'}</td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded text-xs font-bold uppercase ${
                              contact.isActive
                                ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                                : 'bg-gray-600/20 text-gray-300 border border-gray-500/50'
                            }`}>
                              {contact.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex justify-center gap-2">
                              <button className="p-2 hover:bg-cyan-500/20 rounded transition-all text-cyan-300">
                                <Edit2 size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeleteContact(contact.id)}
                                className="p-2 hover:bg-pink-500/20 rounded transition-all text-pink-300">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-cyan-300/60">
                    Page {currentPage} of {totalPages} ({filteredContacts.length} total)
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed border border-cyan-500/50 text-cyan-300 rounded-lg flex items-center gap-2 font-semibold transition-all"
                    >
                      <ChevronLeft size={18} />
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed border border-cyan-500/50 text-cyan-300 rounded-lg flex items-center gap-2 font-semibold transition-all"
                    >
                      Next
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Export Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleExportCSV}
            disabled={exporting || filteredContacts.length === 0}
            className="px-6 py-3 border border-cyan-500/50 hover:border-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed text-cyan-300 hover:text-cyan-200 font-bold rounded-lg flex items-center gap-2 transition-all"
          >
            <Download size={18} />
            {exporting ? 'Exporting...' : 'Export as CSV'}
          </button>
        </div>
      </div>
    </div>
  );
}
