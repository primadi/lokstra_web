import { LitElement, html, css } from "lit";

export class LsTable extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .hs-table-wrapper {
      overflow-x: auto;
      background-color: var(--ls-input-bg);
      border-radius: var(--ls-border-radius-lg);
      box-shadow: var(--ls-shadow-sm);
      border: 1px solid var(--ls-gray-200);
    }

    .hs-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    .hs-table-header {
      background-color: var(--ls-gray-50);
      border-bottom: 1px solid var(--ls-gray-200);
    }

    .hs-table-header th {
      padding: 0.75rem 1rem;
      text-align: left;
      font-weight: 600;
      color: var(--ls-gray-700);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      white-space: nowrap;
    }

    .hs-table-sortable {
      cursor: pointer;
      user-select: none;
      position: relative;
      transition: background-color 0.15s ease-in-out;
    }

    .hs-table-sortable:hover {
      background-color: var(--ls-gray-100);
    }

    .hs-table-sort-icon {
      display: inline-flex;
      align-items: center;
      margin-left: 0.5rem;
      transition: transform 0.2s ease-in-out;
      opacity: 0.5;
    }

    .hs-table-sort-icon.active {
      opacity: 1;
    }

    .hs-table-sort-icon.desc {
      transform: rotate(180deg);
    }

    .hs-table-body tr {
      border-bottom: 1px solid var(--ls-gray-200);
      transition: background-color 0.15s ease-in-out;
    }

    .hs-table-body tr:hover {
      background-color: var(--ls-gray-50);
    }

    .hs-table-body tr.selected {
      background-color: var(--ls-primary-50);
    }

    .hs-table-body td {
      padding: 0.75rem 1rem;
      color: var(--ls-gray-900);
      vertical-align: middle;
    }

    .hs-table-checkbox {
      width: 1rem;
      height: 1rem;
      border: 1px solid var(--ls-input-border);
      border-radius: var(--ls-border-radius-sm);
      cursor: pointer;
      background-color: var(--ls-input-bg);
    }

    .hs-table-checkbox:checked {
      background-color: var(--ls-primary-600);
      border-color: var(--ls-primary-600);
    }

    .hs-table-actions {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .hs-table-action-btn {
      padding: 0.25rem 0.5rem;
      border: none;
      background: none;
      color: var(--ls-gray-500);
      cursor: pointer;
      border-radius: var(--ls-border-radius);
      transition: all 0.15s ease-in-out;
      font-size: 0.75rem;
    }

    .hs-table-action-btn:hover {
      background-color: var(--ls-gray-100);
      color: var(--ls-gray-700);
    }

    .hs-table-action-btn.danger:hover {
      background-color: var(--ls-error-50);
      color: var(--ls-error-600);
    }

    .hs-table-pagination {
      padding: 1rem;
      border-top: 1px solid var(--ls-gray-200);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: var(--ls-gray-50);
    }

    .hs-table-pagination-info {
      color: var(--ls-gray-600);
      font-size: 0.875rem;
    }

    .hs-table-pagination-controls {
      display: flex;
      gap: 0.25rem;
    }

    .ls-table-empty {
      text-align: center;
      padding: 3rem 1rem;
      color: var(--ls-gray-500);
    }

    .ls-table-loading {
      text-align: center;
      padding: 2rem 1rem;
      color: var(--ls-gray-500);
    }

    .ls-table-loading-icon {
      animation: spin 1s linear infinite;
      margin-bottom: 0.5rem;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    /* Status badges */
    .ls-status-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .ls-status-active {
      background-color: var(--ls-success-100);
      color: var(--ls-success-700);
    }

    .ls-status-inactive {
      background-color: var(--ls-gray-100);
      color: var(--ls-gray-700);
    }

    .ls-status-pending {
      background-color: var(--ls-warning-100);
      color: var(--ls-warning-700);
    }

    /* Dark theme */
    :host(.theme-dark) .hs-table-wrapper {
      background-color: var(--ls-gray-800);
      border-color: var(--ls-gray-700);
    }

    :host(.theme-dark) .hs-table-header {
      background-color: var(--ls-gray-700);
      border-color: var(--ls-gray-600);
    }

    :host(.theme-dark) .hs-table-header th {
      color: var(--ls-gray-200);
    }

    :host(.theme-dark) .hs-table-body tr {
      border-color: var(--ls-gray-600);
    }

    :host(.theme-dark) .hs-table-body tr:hover {
      background-color: var(--ls-gray-700);
    }

    :host(.theme-dark) .hs-table-body td {
      color: var(--ls-gray-100);
    }
  `;

  constructor() {
    super();
    this.columns = [];
    this.data = [];
    this.sortBy = "";
    this.sortDir = "asc";
    this.selectable = false;
    this.loading = false;
    this.empty = false;
    this.emptyMessage = "No data available";
    this.loadingMessage = "Loading...";
    this.selectedRows = new Set();
    this.selectAll = false;
    this.pagination = null;
    this.hxGet = "";
    this.hxPost = "";
    this.hxTarget = "";
    this.hxTrigger = "";
  }

  static get properties() {
    return {
      columns: { type: Array },
      data: { type: Array },
      sortBy: { type: String },
      sortDir: { type: String },
      selectable: { type: Boolean },
      loading: { type: Boolean },
      empty: { type: Boolean },
      emptyMessage: { type: String },
      loadingMessage: { type: String },
      selectedRows: { type: Object, state: true },
      selectAll: { type: Boolean, state: true },
      pagination: { type: Object },
      hxGet: { type: String },
      hxPost: { type: String },
      hxTarget: { type: String },
      hxTrigger: { type: String },
    };
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has("data") || changedProperties.has("columns")) {
      // Initialize Lucide icons
      setTimeout(() => {
        if (typeof lucide !== "undefined") {
          lucide.createIcons();
        }
      }, 0);
    }
  }

  handleSort(column) {
    if (!column.sortable) return;

    if (this.sortBy === column.key) {
      this.sortDir = this.sortDir === "asc" ? "desc" : "asc";
    } else {
      this.sortBy = column.key;
      this.sortDir = "asc";
    }

    this.dispatchEvent(
      new CustomEvent("table-sort", {
        detail: { sortBy: this.sortBy, sortDir: this.sortDir, column },
        bubbles: true,
      })
    );

    // HTMX integration for sorting
    if (column.hxGet || column.hxPost) {
      const url = column.hxGet || column.hxPost;
      const method = column.hxGet ? "GET" : "POST";
      const params = new URLSearchParams();
      params.set("sort", this.sortBy);
      params.set("dir", this.sortDir);

      if (typeof htmx !== "undefined") {
        htmx.ajax(method, `${url}?${params.toString()}`, {
          target: column.hxTarget || this.hxTarget,
        });
      }
    }
  }

  handleSelectAll() {
    this.selectAll = !this.selectAll;

    if (this.selectAll) {
      this.selectedRows = new Set(this.data.map((_, index) => index));
    } else {
      this.selectedRows = new Set();
    }

    this.dispatchEvent(
      new CustomEvent("table-select-all", {
        detail: {
          selectAll: this.selectAll,
          selectedRows: Array.from(this.selectedRows),
        },
        bubbles: true,
      })
    );
  }

  handleRowSelect(index) {
    if (this.selectedRows.has(index)) {
      this.selectedRows.delete(index);
    } else {
      this.selectedRows.add(index);
    }

    this.selectAll = this.selectedRows.size === this.data.length;
    this.requestUpdate();

    this.dispatchEvent(
      new CustomEvent("table-select-row", {
        detail: {
          index,
          selected: this.selectedRows.has(index),
          selectedRows: Array.from(this.selectedRows),
        },
        bubbles: true,
      })
    );
  }

  handleAction(action, rowData, index) {
    this.dispatchEvent(
      new CustomEvent("table-action", {
        detail: { action, rowData, index },
        bubbles: true,
      })
    );

    // Handle confirmation
    if (action.confirm && !confirm(action.confirm)) {
      return;
    }

    // HTMX integration for actions
    if (action.hxGet || action.hxPost) {
      const url = action.hxGet || action.hxPost;
      const method = action.hxGet ? "GET" : "POST";

      if (typeof htmx !== "undefined") {
        htmx.ajax(method, url, {
          target: action.hxTarget || this.hxTarget,
        });
      }
    }
  }

  renderCell(column, rowData, index) {
    const value = rowData[column.key];

    if (column.template === "status") {
      return html`
        <span class="ls-status-badge ls-status-${value.toLowerCase()}">
          ${value}
        </span>
      `;
    }

    if (column.template === "avatar") {
      return html`
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div
            style="width: 2rem; height: 2rem; border-radius: 50%; background-color: var(--ls-primary-100); color: var(--ls-primary-600); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.875rem;"
          >
            ${rowData.name?.charAt(0) || "?"}
          </div>
          <div>
            <div style="font-weight: 500;">${rowData.name}</div>
            <div style="font-size: 0.75rem; color: var(--ls-gray-600);">
              ${rowData.email}
            </div>
          </div>
        </div>
      `;
    }

    if (column.template === "date") {
      return html`
        <span title="${value}"> ${new Date(value).toLocaleDateString()} </span>
      `;
    }

    return html`<span>${value}</span>`;
  }

  renderActions(rowData, index) {
    if (!this.columns.some((col) => col.actions)) return "";

    const actionsColumn = this.columns.find((col) => col.actions);

    return html`
      <div class="hs-table-actions">
        ${actionsColumn.actions.map(
          (action) => html`
            <button
              class="hs-table-action-btn ${action.variant || ""}"
              title="${action.title}"
              @click="${() => this.handleAction(action, rowData, index)}"
            >
              ${action.icon
                ? html`<i
                    data-lucide="${action.icon}"
                    style="width: 1rem; height: 1rem;"
                  ></i>`
                : action.title}
            </button>
          `
        )}
      </div>
    `;
  }

  render() {
    if (this.loading) {
      return html`
        <div class="hs-table-wrapper">
          <div class="ls-table-loading">
            <i
              data-lucide="loader-2"
              class="ls-table-loading-icon"
              style="width: 2rem; height: 2rem;"
            ></i>
            <p>${this.loadingMessage}</p>
          </div>
        </div>
      `;
    }

    if (this.empty || this.data.length === 0) {
      return html`
        <div class="hs-table-wrapper">
          <div class="ls-table-empty">
            <i
              data-lucide="inbox"
              style="width: 3rem; height: 3rem; margin-bottom: 1rem; opacity: 0.5;"
            ></i>
            <p>${this.emptyMessage}</p>
          </div>
        </div>
      `;
    }

    const hasActions = this.columns.some((col) => col.actions);

    return html`
      <div class="hs-table-wrapper">
        <table class="hs-table">
          <thead class="hs-table-header">
            <tr>
              ${this.selectable
                ? html`
                    <th style="width: 3rem;">
                      <input
                        type="checkbox"
                        class="hs-table-checkbox"
                        .checked="${this.selectAll}"
                        @change="${this.handleSelectAll}"
                      />
                    </th>
                  `
                : ""}
              ${this.columns.map(
                (column) => html`
                  <th
                    class="${column.sortable
                      ? "hs-table-sortable"
                      : ""} ${column.class || ""}"
                    style="${column.width ? `width: ${column.width}` : ""}"
                    @click="${column.sortable
                      ? () => this.handleSort(column)
                      : null}"
                  >
                    ${column.title}
                    ${column.sortable
                      ? html`
                          <span
                            class="hs-table-sort-icon ${this.sortBy ===
                            column.key
                              ? "active"
                              : ""} ${this.sortBy === column.key &&
                            this.sortDir === "desc"
                              ? "desc"
                              : ""}"
                          >
                            <i
                              data-lucide="chevron-up"
                              style="width: 1rem; height: 1rem;"
                            ></i>
                          </span>
                        `
                      : ""}
                  </th>
                `
              )}
              ${hasActions ? html`<th style="width: 8rem;">Actions</th>` : ""}
            </tr>
          </thead>

          <tbody class="hs-table-body">
            ${this.data.map(
              (rowData, index) => html`
                <tr class="${this.selectedRows.has(index) ? "selected" : ""}">
                  ${this.selectable
                    ? html`
                        <td>
                          <input
                            type="checkbox"
                            class="hs-table-checkbox"
                            .checked="${this.selectedRows.has(index)}"
                            @change="${() => this.handleRowSelect(index)}"
                          />
                        </td>
                      `
                    : ""}
                  ${this.columns.map(
                    (column) => html`
                      <td class="${column.cellClass || ""}">
                        ${this.renderCell(column, rowData, index)}
                      </td>
                    `
                  )}
                  ${hasActions
                    ? html` <td>${this.renderActions(rowData, index)}</td> `
                    : ""}
                </tr>
              `
            )}
          </tbody>
        </table>

        ${this.pagination
          ? html`
              <div class="hs-table-pagination">
                <div class="hs-table-pagination-info">
                  Showing ${this.pagination.from} to ${this.pagination.to} of
                  ${this.pagination.total} results
                </div>

                <div class="hs-table-pagination-controls">
                  <ls-button
                    text="Previous"
                    variant="outline"
                    size="sm"
                    ?disabled="${this.pagination.currentPage === 1}"
                    @click="${() =>
                      this.handlePageChange(this.pagination.currentPage - 1)}"
                  ></ls-button>

                  ${this.pagination.pages.map(
                    (page) => html`
                      <ls-button
                        text="${page}"
                        variant="${page === this.pagination.currentPage
                          ? "primary"
                          : "outline"}"
                        size="sm"
                        @click="${() => this.handlePageChange(page)}"
                      ></ls-button>
                    `
                  )}

                  <ls-button
                    text="Next"
                    variant="outline"
                    size="sm"
                    ?disabled="${this.pagination.currentPage ===
                    this.pagination.lastPage}"
                    @click="${() =>
                      this.handlePageChange(this.pagination.currentPage + 1)}"
                  ></ls-button>
                </div>
              </div>
            `
          : ""}
      </div>
    `;
  }

  handlePageChange(page) {
    if (page < 1 || page > this.pagination.lastPage) return;

    this.dispatchEvent(
      new CustomEvent("table-page-change", {
        detail: { page },
        bubbles: true,
      })
    );

    // HTMX integration for pagination
    if (this.pagination.hxGet || this.pagination.hxPost) {
      const url = this.pagination.hxGet || this.pagination.hxPost;
      const method = this.pagination.hxGet ? "GET" : "POST";
      const params = new URLSearchParams();
      params.set("page", page.toString());

      if (typeof htmx !== "undefined") {
        htmx.ajax(method, `${url}?${params.toString()}`, {
          target: this.pagination.hxTarget || this.hxTarget,
        });
      }
    }
  }
}

customElements.define("ls-table", LsTable);
