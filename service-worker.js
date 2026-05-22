const SHORTCUT_TARGETS = {
  home: "/Windchill/app/#ptc1/homepage",
  serverStatus : "/Windchill/wtcore/jsp/jmx/serverStatus.jsp",
  logFileViewer: "/Windchill/wtcore/jsp/jmx/logFileViewer.jsp",
  logLevel: "/Windchill/wtcore/jsp/jmx/logLevel.jsp",
  indexingAdministration: "/Windchill/app/#ptc1/search/indexStatus?corename=wblib&containerOid=OR%3Awt.inf.container.ExchangeContainer%3A5&u8=1",
  queueManagement: "/Windchill/app/#ptc1/comp/queue.table",
  policyAdministration: "/Windchill/apps/policyadministration/index.jsp?containerOid=OR%3Awt.inf.container.ExchangeContainer%3A5&u8=1",
  participantAdministration: "/Windchill/app/#ptc1/FlexPLM/administration/participantAdministration?oid=OR%3Awt.inf.container.ExchangeContainer%3A5&u8=1",
  typeAndAttribute: "/Windchill/netmarkets/jsp/administration/shell.jsp?containerOid=OR%3Awt.inf.container.ExchangeContainer%3A5&u8=1&shellAdmin=Admin&helpCenter=wt.fhc.url#netmarkets/jsp/administration/typemgr.jsp"
};

const MENU_ROOT_ID = "windchill-shortcuts";

const MENU_ITEMS = [
  { id: "home", title: "Open Windchill Home" },
  { id: "search", title: "Open Windchill Search" },
  { id: "serverStatus", title: "Open Windchill Server Status" },
  { id: "logFileViewer", title: "Open Windchill Log File Viewer" },
  { id: "logLevel", title: "Open Windchill Log Level" },
  { id: "indexingAdministration", title: "Open Windchill Indexing Administration" },
  { id: "queueManagement", title: "Open Windchill Queue Management" },
  { id: "policyAdministration", title: "Open Windchill Policy Administration" },
  { id: "participantAdministration", title: "Open Windchill Participant Administration" },
  { id: "typeAndAttribute", title: "Open Windchill Type and Attribute Manager" }
];

function isWindchillUrl(url) {
  try {
    const parsedUrl = new URL(url);

    return parsedUrl.pathname.toLowerCase().includes("/windchill/");
  } catch {
    return false;
  }
}

function buildUrl(baseUrl, targetPath) {
  return new URL(targetPath, baseUrl).toString();
}

function createMenuItems() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: MENU_ROOT_ID,
      title: "Windchill Shortcuts",
      contexts: ["page"],
      documentUrlPatterns: ["*://*/Windchill/*"]
    });

    for (const item of MENU_ITEMS) {
      chrome.contextMenus.create({
        id: item.id,
        title: item.title,
        parentId: MENU_ROOT_ID,
        contexts: ["page"],
        documentUrlPatterns: ["*://*/Windchill/*"]
      });
    }
  });
}

chrome.runtime.onInstalled.addListener(() => {
  createMenuItems();
});

chrome.runtime.onStartup.addListener(() => {
  createMenuItems();
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab?.url || !isWindchillUrl(tab.url)) {
    return;
  }

  const targetPath = SHORTCUT_TARGETS[info.menuItemId];

  if (!targetPath) {
    return;
  }

  const targetUrl = buildUrl(tab.url, targetPath);

  chrome.tabs.create({ url: targetUrl, active: true });
});
