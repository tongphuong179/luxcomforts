import React from 'react'

const TableBase = () => {
    return (
        <div>
            <table class="border-collapse border border-slate-500 ...">
                <thead>
                    <tr>
                        <th class="border border-slate-600 ...">State</th>
                        <th class="border border-slate-600 ...">City</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="border border-slate-700 ...">Indiana</td>
                        <td class="border border-slate-700 ...">Indianapolis</td>
                    </tr>
                    <tr>
                        <td class="border border-slate-700 ...">Ohio</td>
                        <td class="border border-slate-700 ...">Columbus</td>
                    </tr>
                    <tr>
                        <td class="border border-slate-700 ...">Michigan</td>
                        <td class="border border-slate-700 ...">Detroit</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableBase