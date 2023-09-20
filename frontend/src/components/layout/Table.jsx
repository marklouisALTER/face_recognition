import React from 'react'
import levi_logo from '../../assets/levi.jpg'
export const Table = () => {
  return (
    <table className="min-w-full mt-10 leading-normal">
    <thead>
      <tr>
        <th
          className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
        >
          Employee / Registered
        </th>
        <th
          className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
        >
          Date
        </th>
        <th
          className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
        >
          Time in
        </th>
        <th
          className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
        >
          Time out
        </th>
        <th
          className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
        >
          Status
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
          <div className=" flex flex-col gap-0 md:flex-row items-center md:gap-5">
            <div className="flex-shrink-0 w-10 h-10">
              <img
                className="w-full h-full rounded-full"
                src={levi_logo}
                alt=""
              />
            </div>
            <div className="">
              <p className="text-gray-900 whitespace-no-wrap text-center">
                Christian Levi Gernale
              </p>
              <p className="text-gray-600 whitespace-no-wrap text-center">000004</p>
            </div>
          </div>
        </td>
        <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">September 19 2023</p>
          <p className="text-gray-600 whitespace-no-wrap">09/19/2023</p>
        </td>
        <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">----</p>
          <p className="text-gray-600 whitespace-no-wrap">--</p>
        </td>
        <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">----</p>
          <p className="text-gray-600 whitespace-no-wrap">--</p>
        </td>
        <td className="px-3 py-5 border-b border-gray-200 bg-white text-sm">
          <span
            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
          >
            <span
              aria-hidden
              className="absolute inset-0 bg-red-300 opacity-50 rounded-full"
            ></span>
            <span className="relative">Absent</span>
          </span>
        </td>
        <td
          className="px-3 py-5 border-b border-gray-200 bg-white text-sm text-center"
        >
          <button
            type="button"
            className="inline-block text-gray-500 hover:text-gray-700"
          >
            <svg
              className="inline-block h-6 w-6 fill-current"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
              />
            </svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  )
}
